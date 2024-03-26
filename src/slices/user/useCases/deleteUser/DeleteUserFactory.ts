import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { DeleteUser,deleteUser } from "@/slices/user/useCases";

export const makeDeleteUserFactory = (): DeleteUser => {
  const repository = new UserRepository(new MongoRepository("user"));
  return deleteUser(repository);
};