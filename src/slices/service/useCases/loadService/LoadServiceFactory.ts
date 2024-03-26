import { MongoRepository } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { LoadService,loadService } from "@/slices/service/useCases";

export const makeLoadServiceFactory = (): LoadService => {
  const repository = new ServiceRepository(new MongoRepository("service"));
  return loadService(repository);
};