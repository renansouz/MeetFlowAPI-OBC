import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { LoadRequest,loadRequest } from "@/slices/request/useCases";

export const makeLoadRequestFactory = (): LoadRequest => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return loadRequest(repository);
};