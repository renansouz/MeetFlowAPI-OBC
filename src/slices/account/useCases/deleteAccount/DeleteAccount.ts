import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { DeleteAccountRepository } from "@/slices/account/repositories";

export type DeleteAccount = (query: Query) => Promise<AccountData | null>;

export type DeleteAccountSignature = (
    deleteAccount: DeleteAccountRepository
) => DeleteAccount;

export const deleteAccount: DeleteAccountSignature =
    (deleteAccountRepository: DeleteAccountRepository) => (query: Query) => {
      return deleteAccountRepository.deleteAccount(query);
    };
