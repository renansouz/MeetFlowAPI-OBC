import { authLogged } from "@/application/infra/middlewares";

import {
  addRequestAdapter,
  deleteRequestAdapter,
  loadRequestAdapter,
  loadRequestByPageAdapter,
  updateRequestAdapter,
} from "./requestAdapter";
import {
  addRequestPostSchema,
  deleteRequestSchema,
  loadRequestByPageGetSchema,
  loadRequestGetSchema,
  updateRequestSchema,
} from "./requestSchema";

async function request(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/request/add", addRequestPostSchema, addRequestAdapter());
  fastify.get("/request/load", loadRequestGetSchema, loadRequestAdapter());
  fastify.get(
    "/request/loadByPage",
    loadRequestByPageGetSchema,
    loadRequestByPageAdapter()
  );
  fastify.delete("/request/delete", deleteRequestSchema, deleteRequestAdapter());
  fastify.patch("/request/update", updateRequestSchema, updateRequestAdapter());
}
export { request };
