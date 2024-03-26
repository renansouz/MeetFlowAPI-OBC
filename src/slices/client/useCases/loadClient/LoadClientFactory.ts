import { MongoRepository } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { LoadClient,loadClient } from "@/slices/client/useCases";

export const makeLoadClientFactory = (): LoadClient => {
  const repository = new ClientRepository(new MongoRepository("client"));
  return loadClient(repository);
};