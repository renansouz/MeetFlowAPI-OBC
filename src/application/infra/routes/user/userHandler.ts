import { FastifyInstance } from "fastify";

import { MongoHelper } from "@/application/infra";

export const userHandler = (fastify: FastifyInstance) => async (request: any, reply: any) => {
  const collection = await MongoHelper.getCollection("test");
  const userInserted = await collection.insertOne(request.body);
  reply.send(userInserted);
};