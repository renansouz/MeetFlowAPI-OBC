import { FastifyInstance } from "fastify";
import multer from "fastify-multer";

import { authLogged } from "@/application/infra/middlewares";

import {
  addPhotoAdapter,
  deletePhotoAdapter,
} from "./photoAdapter";
import {
  addPhotoPostSchema,
  deletePhotoSchema,
} from "./photoSchema";


async function photo(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());
  
  const upload = multer();
  fastify.addHook("preHandler", upload.single("file"));

  fastify.post("/photo/add", addPhotoPostSchema, addPhotoAdapter());
  fastify.delete("/photo/delete", deletePhotoSchema, deletePhotoAdapter());
}

export { photo };