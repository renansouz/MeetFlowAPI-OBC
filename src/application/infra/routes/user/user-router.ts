import { FastifyInstance } from "fastify";

import { userHandler } from "./userHandler";
import { userPostSchema } from "./userSchema";

async function user(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", (request: any, reply: any, done: any) => {
    done();
  });
  fastify.post("/user", userPostSchema, userHandler(fastify));
}
export { user };