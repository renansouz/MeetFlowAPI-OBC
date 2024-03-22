import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { UpdateAccountRepository } from "@/slices/account/repositories";

export type UpdateAccount = (
    query: Query,
    data: AccountData
) => Promise<AccountData | null>;

export type UpdateAccountSignature = (
    updateAccount: UpdateAccountRepository
) => UpdateAccount;

export const updateAccount: UpdateAccountSignature =
    (updateAccountRepository: UpdateAccountRepository) =>
      async (query: Query, data: AccountData) => {
        return updateAccountRepository.updateAccount(query, data);
      };
