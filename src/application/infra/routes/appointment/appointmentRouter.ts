import { authLogged } from "@/application/infra/middlewares";

import {
  addAppointmentAdapter,
  deleteAppointmentAdapter,
  loadAppointmentAdapter,
  loadAppointmentByPageAdapter,
  updateAppointmentAdapter,
} from "./appointmentAdapter";
import {
  addAppointmentPostSchema,
  deleteAppointmentSchema,
  loadAppointmentByPageGetSchema,
  loadAppointmentGetSchema,
  updateAppointmentSchema,
} from "./appointmentSchema";

async function appointment(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/appointment/add", addAppointmentPostSchema, addAppointmentAdapter());
  fastify.get("/appointment/load", loadAppointmentGetSchema, loadAppointmentAdapter());
  fastify.get(
    "/appointment/loadByPage",
    loadAppointmentByPageGetSchema,
    loadAppointmentByPageAdapter()
  );
  fastify.delete("/appointment/delete", deleteAppointmentSchema, deleteAppointmentAdapter());
  fastify.patch("/appointment/update", updateAppointmentSchema, updateAppointmentAdapter());
}
export { appointment };