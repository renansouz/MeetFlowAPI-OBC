import { MongoRepository } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { LoadClientByPage,loadClientByPage } from "@/slices/client/useCases";

export const makeLoadClientByPageFactory = (): LoadClientByPage => {
  const repository = new ClientRepository(new MongoRepository("client"));
  return loadClientByPage(repository);
};