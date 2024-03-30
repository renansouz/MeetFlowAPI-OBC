import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { LoadProfessional,loadProfessional } from "@/slices/user/useCases";

export const makeLoadProfessionalFactory = (): LoadProfessional => {
  const repository = new UserRepository(new MongoRepository("user"));
  return loadProfessional(repository);
};