import { MongoRepository } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { DeleteService,deleteService } from "@/slices/service/useCases";

export const makeDeleteServiceFactory = (): DeleteService => {
  const repository = new ServiceRepository(new MongoRepository("service"));
  return deleteService(repository);
};