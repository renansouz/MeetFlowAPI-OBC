import { FastifyInstance } from "fastify";

import { authLogged } from "@/application/infra/middlewares";

import {
  addServiceAdapter,
  deleteServiceAdapter,
  loadServiceAdapter,
  loadServiceByPageAdapter,
  updateServiceAdapter,
} from "./serviceAdapter";
import {
  addServicePostSchema,
  deleteServiceSchema,
  loadServiceByPageGetSchema,
  loadServiceGetSchema,
  updateServiceSchema,
} from "./serviceSchema";

async function service(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/service/add", addServicePostSchema, addServiceAdapter());
  fastify.get("/service/load", loadServiceGetSchema, loadServiceAdapter());
  fastify.get(
    "/service/loadByPage",
    loadServiceByPageGetSchema,
    loadServiceByPageAdapter()
  );
  fastify.delete("/service/delete", deleteServiceSchema, deleteServiceAdapter());
  fastify.patch("/service/update", updateServiceSchema, updateServiceAdapter());
}
export { service };
