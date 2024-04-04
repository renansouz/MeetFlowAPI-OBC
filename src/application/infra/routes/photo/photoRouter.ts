import { FastifyInstance } from "fastify";
import multer from "fastify-multer";

import { authLogged } from "@/application/infra/middlewares";

import {
  addPhotoAdapter,
  deletePhotoAdapter,
  updatePhotoAdapter,
} from "./photoAdapter";
import {
  addPhotoPostSchema,
  deletePhotoSchema,
  updatePhotoSchema,
} from "./photoSchema";

const upload = multer();

export async function photo(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.addHook("preHandler", upload.single("file"));

  fastify.post("/photo/add", addPhotoPostSchema, addPhotoAdapter());
  fastify.delete("/photo/delete", deletePhotoSchema, deletePhotoAdapter());
  fastify.patch("/photo/update", updatePhotoSchema, updatePhotoAdapter());
}