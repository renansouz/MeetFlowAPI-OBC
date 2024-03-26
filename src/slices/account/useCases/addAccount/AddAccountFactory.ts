import { MongoRepository } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { AddAccount,addAccount } from "@/slices/account/useCases";

export const makeAddAccountFactory = (): AddAccount => {
  const repository = new AccountRepository(new MongoRepository("account"));
  return addAccount(repository);
};