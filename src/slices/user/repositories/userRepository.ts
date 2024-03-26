import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { UserData, UserPaginated } from "@/slices/user/entities";

import {
  AddUserRepository,
  DeleteUserRepository,
  LoadUserByPageRepository,
  LoadUserRepository,
  UpdateUserRepository,
} from "./contracts";

export class UserRepository implements
        AddUserRepository,
        DeleteUserRepository,
        LoadUserByPageRepository,
        LoadUserRepository,
        UpdateUserRepository       
{
  
  async incrementAppointmentsTotal(query: Query): Promise<UserData | null> {
    return this.repository.increment(query?.fields ?? {}, {appointmentsTotal: 1});
  }
  constructor(private readonly repository: Repository) {}

  async addUser(user: UserData): Promise<UserData | null> {
    return this.repository.add(user);
  }

  async deleteUser(query: Query): Promise<UserData | null> {
    return this.repository.deleteOne(query?.fields);
  }

  async loadUserByPage(query: Query): Promise<UserPaginated | null> {

    const users = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { users, total };
  }

  async loadUser(query: Query): Promise<UserData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }

  async updateUser(query: Query, data: UserData): Promise<UserData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}