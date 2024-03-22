import { Query } from "@/application/types";
import { AccountPaginated } from "@/slices/account/entities";
import { LoadAccountByPageRepository } from "@/slices/account/repositories";

export type LoadAccountByPage = (query: Query) => Promise<AccountPaginated | null>;

export type LoadAccountByPageSignature = (
    loadAccountByPage: LoadAccountByPageRepository
) => LoadAccountByPage;

export const loadAccountByPage: LoadAccountByPageSignature =
    (loadAccountByPageRepository: LoadAccountByPageRepository) => async (query: Query) => {
      return loadAccountByPageRepository.loadAccountByPage(query);
    };
