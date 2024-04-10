import { FastifyInstance } from "fastify";

import { refreshtokenLogged } from "@/application/infra/middlewares";

import { refreshAdapter, whoAmIAdapter } from "./accountAdapter";
import { refreshGetSchema, whoAmIGetSchema } from "./accountSchema";

export async function account(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", refreshtokenLogged());
  fastify.get("/account/refresh", refreshGetSchema, refreshAdapter());
  fastify.get("/account/whoami", whoAmIGetSchema, whoAmIAdapter());
}
