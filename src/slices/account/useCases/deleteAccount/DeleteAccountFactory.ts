import { MongoRepository } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { DeleteAccount,deleteAccount } from "@/slices/account/useCases";

export const makeDeleteAccountFactory = (): DeleteAccount => {
  const repository = new AccountRepository(new MongoRepository("account"));
  return deleteAccount(repository);
};