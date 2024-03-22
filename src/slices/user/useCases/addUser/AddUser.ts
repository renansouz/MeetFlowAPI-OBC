import { UserData,UserEntity } from "@/slices/user/entities";
import { AddUserRepository } from "@/slices/user/repositories";

export type AddUser = (data: UserData) => Promise<UserEntity | null>;

export type AddUserSignature = (
  addUser: AddUserRepository,
) => AddUser;

export class AddUserClass{
  constructor(private addUserRepository: AddUserRepository){}

  async execute(data: UserData): Promise<UserEntity | null> {
    return this.addUserRepository.addUser(new UserEntity(data));
  }
}