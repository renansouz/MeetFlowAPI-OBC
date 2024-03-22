import { Query } from "@/application/types";
import { AccountData } from "@/slices/account/entities";
import { LoadAccountRepository } from "@/slices/account/repositories";

export type LoadAccount = (query: Query) => Promise<AccountData | null>;

export type LoadAccountSignature = (loadAccount: LoadAccountRepository) => LoadAccount;

export const loadAccount: LoadAccountSignature =
  (loadAccountRepository: LoadAccountRepository) => async (query: Query) => {
    return loadAccountRepository.loadAccount(query);
  };
