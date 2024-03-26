import { AccountData,AccountEntity } from "@/slices/account/entities";
import {
  AddAccountRepository,
  DeleteAccountRepository,
} from "@/slices/account/repositories";

export type AddAccount = (data: AccountData) => Promise<AccountEntity | null>;

export type AddAccountSignature = (
  addAccount: AddAccountRepository & DeleteAccountRepository
) => AddAccount;

export const addAccount: AddAccountSignature =
  (accountRepository: AddAccountRepository & DeleteAccountRepository) =>
    async (data: AccountData) => {
      if (data?.createdById) {
        await accountRepository.deleteAccount({
          fields: { createdById: data?.createdById },
          options: {},
        });
      }
      return accountRepository.addAccount(new AccountEntity(data));
    };