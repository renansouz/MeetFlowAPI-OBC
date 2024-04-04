import { FastifyInstance } from "fastify";

import { loginAdapter,signupAdapter } from "./authAdapter";
import { loginPostSchema,signupPostSchema } from "./authSchema";

export async function auth(fastify: FastifyInstance, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());

}
