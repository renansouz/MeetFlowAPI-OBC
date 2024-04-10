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

export async function photo(fastify: FastifyInstance, options: any) {
  fastify.addHook("preHandler", authLogged());

  fastify.post("/photo/add", { onRequest: multer().single("file"), schema: addPhotoPostSchema }, addPhotoAdapter());
  fastify.delete("/photo/delete", deletePhotoSchema, deletePhotoAdapter());
}

// Bug devido ao multer iniciar antes do preHandler
// export async function photo(fastify: FastifyInstance, options: any) {
//   fastify.addHook("preHandler", authLogged());
//   
//   const upload = multer();
//   fastify.addHook("preHandler", upload.single("file"));
// 
//   fastify.post("/photo/add", addPhotoPostSchema, addPhotoAdapter());
//   fastify.delete("/photo/delete", deletePhotoSchema, deletePhotoAdapter());
// }
