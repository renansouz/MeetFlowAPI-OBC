import { authLogged } from "@/application/infra/middlewares";

import {
  addScheduleAdapter,
  deleteScheduleAdapter,
  loadScheduleAdapter,
  loadScheduleByPageAdapter,
  updateScheduleAdapter,
} from "./scheduleAdapter";
import {
  addSchedulePostSchema,
  deleteScheduleSchema,
  loadScheduleByPageGetSchema,
  loadScheduleGetSchema,
  updateScheduleSchema,
} from "./scheduleSchema";

async function schedule(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/schedule/add", addSchedulePostSchema, addScheduleAdapter());
  fastify.get("/schedule/load", loadScheduleGetSchema, loadScheduleAdapter());
  fastify.get("/schedule/loadByPage", loadScheduleByPageGetSchema, loadScheduleByPageAdapter());
  fastify.delete("/schedule/delete", deleteScheduleSchema, deleteScheduleAdapter());
  fastify.patch("/schedule/update", updateScheduleSchema, updateScheduleAdapter());
}
export { schedule };
