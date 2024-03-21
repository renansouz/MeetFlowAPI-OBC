import { Query } from "@/application/types";
import { UserPaginated } from "@/slices/user/entities";
import { LoadUserByPageRepository } from "@/slices/user/repositories";

export type LoadUserByPage = (query: Query) => Promise<UserPaginated | null>;

export type LoadUserByPageSignature = (
    loadUserByPage: LoadUserByPageRepository
) => LoadUserByPage;

export const loadUserByPage: LoadUserByPageSignature =
    (loadUserByPageRepository: LoadUserByPageRepository) => async (query: Query) => {
      return loadUserByPageRepository.loadUserByPage(query);
    };
