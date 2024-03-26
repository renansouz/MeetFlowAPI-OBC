/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";

import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { env, MongoHelper,routes } from "@/application/infra";
const { fastifyRequestContextPlugin } = require("@fastify/request-context");

export const makeFastifyInstance = async (externalMongoClient = null) => {
  const fastify: FastifyInstance = Fastify({ logger: true });
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));

    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(require("@fastify/cors"), {
      origin: "*",
      methods: ["POST", "GET", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "authorization", "refreshtoken"],
    });
    await fastify.register(require("@fastify/rate-limit"), {
      max: 100,
      timeWindow: "5 minute",
    });
    if (env.environment === "production") {
      await fastify.register(require("@fastify/under-pressure"), {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 100000000,
        maxRssBytes: 100000000,
        maxEventLoopUtilization: 0.98,
        message: "Estamos sobrecarregados!",
        retryAfter: 50,
      });
    }

    await fastify.register(fastifyRequestContextPlugin, {
      hook: "onRequest",
      defaultStoreValues: {
        user: { insertedId: "system" },
      },
    });
        
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      client,
    });

    for (const route of routes) { // Percorrendo todas as rotas
      fastify.register(route, { prefix: "/api" });
    }
    return fastify;
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
// Run the server!
const start = async () => {
  const fastifyInstance = await makeFastifyInstance();
  if (!fastifyInstance) return;
  const port: any = env?.port ?? 3000;
  await fastifyInstance.listen({ port, host: "0.0.0.0" });
  fastifyInstance.log.info(`server listening on ${port}`);
};
if (env.environment === "production") {
  start();
}