import { authLogged } from "@/application/infra/middlewares";

import {
  addClientAdapter,
  deleteClientAdapter,
  loadClientAdapter,
  loadClientByPageAdapter,
  updateClientAdapter,
} from "./clientAdapter";
import {
  addClientPostSchema,
  deleteClientSchema,
  loadClientByPageGetSchema,
  loadClientGetSchema,
  updateClientSchema,
} from "./clientSchema";

async function client(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/client/add", addClientPostSchema, addClientAdapter());
  fastify.get("/client/load", loadClientGetSchema, loadClientAdapter());
  fastify.get("/client/loadByPage", loadClientByPageGetSchema, loadClientByPageAdapter());
  fastify.delete("/client/delete", deleteClientSchema, deleteClientAdapter());
  fastify.patch("/client/update", updateClientSchema, updateClientAdapter());
}
export { client };
