import { Optional,Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { UpdateUserRepository } from "@/slices/user/repositories";

type UpdateUserDataInput = Optional<UserData, "email" | "name" | "password" | "role" | "photoUrl">;

export type UpdateUser = (query: Query, data: UpdateUserDataInput) => Promise<UserData | null>;

export type UpdateUserSignature = (updateUser: UpdateUserRepository) => UpdateUser;

export const updateUser: UpdateUserSignature =
    (updateUserRepository: UpdateUserRepository) =>
      async (query: Query, data: UpdateUserDataInput) => {
        return updateUserRepository.updateUser(query, data);
      };
