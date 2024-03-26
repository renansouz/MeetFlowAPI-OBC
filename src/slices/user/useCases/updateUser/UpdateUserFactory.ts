import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { UpdateUser,updateUser } from "@/slices/user/useCases";

export const makeUpdateUserFactory = (): UpdateUser => {
  const repository = new UserRepository(new MongoRepository("user"));
  return updateUser(repository);
};