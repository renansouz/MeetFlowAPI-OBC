import { MongoRepository } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { AddService,addService } from "@/slices/service/useCases";

export const makeAddServiceFactory = (): AddService => {
  const repository = new ServiceRepository(new MongoRepository("service"));
  return addService(repository);
};