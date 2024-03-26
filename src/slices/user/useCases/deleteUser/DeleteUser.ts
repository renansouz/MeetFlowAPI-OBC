import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { DeleteUserRepository } from "@/slices/user/repositories";

export type DeleteUser = (query: Query) => Promise<UserData | null>;

export type DeleteUserSignature = (deleteUser: DeleteUserRepository) => DeleteUser;

export const deleteUser: DeleteUserSignature =
    (deleteUserRepository: DeleteUserRepository) => (query: Query) => {
      return deleteUserRepository.deleteUser(query);
    };
