import { BcryptAdapter, MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { AddUser,addUser } from "@/slices/user/useCases";

export const makeAddUserFactory = (): AddUser => {
  const salt = 8;
  const bcryptAdapter = new BcryptAdapter(salt);
  const repository = new UserRepository(new MongoRepository("user"));
  return addUser(repository, bcryptAdapter);
};
