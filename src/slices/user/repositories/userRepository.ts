import { QueryBuilder, success } from "@/application/helpers";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { UserData, UserPaginated } from "@/slices/user/entities";

import {
  AddUserRepository,
  DeleteUserRepository,
  LoadProfessionalRepository,
  LoadUserByPageRepository,
  LoadUserRepository,
  UpdateUserRepository} from "./contracts";

export class UserRepository implements
        AddUserRepository,
        DeleteUserRepository,
        LoadUserByPageRepository,
        LoadUserRepository,
        UpdateUserRepository,
        LoadProfessionalRepository       
{
  
  async incrementAppointmentsTotal(query: Query): Promise<UserData | null> {
    return this.repository.increment(query?.fields ?? {}, {appointmentsTotal: 1});
  }
  constructor(private readonly repository: Repository) {}

  async loadProfessional(): Promise<any> {
    const queryBuilded = new QueryBuilder()
      .match({
        role: "professional"
      })
      .sort({ initDate: 1 })
      .project({ photoId: 0, password: 0, updatedAt: 0, scheduleId: 0})
      .group({ _id: null , data: { $push: "$$ROOT" } })
      .build();
    const professional = await this.repository.aggregate(queryBuilded);
    if (
      professional?.length > 0 &&
      professional?.[0]?.data
    ) {
      return success(professional[0].data);
    }
    return null;
  }
  
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