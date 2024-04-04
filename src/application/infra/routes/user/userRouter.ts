import { FastifyInstance } from "fastify";

import { authLogged } from "@/application/infra/middlewares";
import {onSendRedis, preHandlerRedis} from "@/application/infra/redis";

import {
  addUserAdapter,
  deleteUserAdapter,
  loadProfessionalByPageAdapter,
  loadUserAdapter,
  loadUserByPageAdapter,
  updateUserAdapter} from "./userAdapter";
import {
  addUserPostSchema,
  deleteUserSchema,
  loadProfessionalGetSchema,
  loadUserByPageGetSchema,
  loadUserGetSchema,
  updateUserSchema,
} from "./userSchema";

export async function user(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());
  if (process.env.NODE_ENV === "production") {
    fastify.addHook("preHandler", preHandlerRedis("user"));
    fastify.addHook("onSend", onSendRedis("user", 120)); // 2 minutes
  }
  fastify.get("/user/loadByPage", loadUserByPageGetSchema, loadUserByPageAdapter());
  fastify.post("/user/add", addUserPostSchema, addUserAdapter());
  fastify.delete("/user/delete", deleteUserSchema, deleteUserAdapter());
  fastify.patch("/user/update", updateUserSchema, updateUserAdapter());
}

export async function userProfessionalByPage(fastify: FastifyInstance, options: any) {
  fastify.get("/user/load", loadUserGetSchema, loadUserAdapter());
  fastify.get("/user/loadProfessional", loadProfessionalGetSchema, loadProfessionalByPageAdapter());
}