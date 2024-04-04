import { FastifyInstance } from "fastify";

import { authLogged } from "@/application/infra/middlewares";

import {
  addOrderAdapter,
  deleteOrderAdapter,
  loadOrderAdapter,
  loadOrderByPageAdapter,
  updateOrderAdapter,
} from "./orderAdapter";
import {
  addOrderPostSchema,
  deleteOrderSchema,
  loadOrderByPageGetSchema,
  loadOrderGetSchema,
  updateOrderSchema,
} from "./orderSchema";

async function order(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/order/add", addOrderPostSchema, addOrderAdapter());
  fastify.get("/order/load", loadOrderGetSchema, loadOrderAdapter());
  fastify.get("/order/loadByPage", loadOrderByPageGetSchema, loadOrderByPageAdapter());
  fastify.delete("/order/delete", deleteOrderSchema, deleteOrderAdapter());
  fastify.patch("/order/update", updateOrderSchema, updateOrderAdapter());
}
export { order };
