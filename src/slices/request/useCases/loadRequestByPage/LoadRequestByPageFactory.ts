import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { LoadRequestByPage,loadRequestByPage } from "@/slices/request/useCases";

export const makeLoadRequestByPageFactory = (): LoadRequestByPage => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return loadRequestByPage(repository);
};