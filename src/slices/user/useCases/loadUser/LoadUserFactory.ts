import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { LoadUser,loadUser } from "@/slices/user/useCases";

export const makeLoadUserFactory = (): LoadUser => {
  const repository = new UserRepository(new MongoRepository("user"));
  return loadUser(repository);
};