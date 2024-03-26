import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { ScheduleData, SchedulePaginated } from "@/slices/schedule/entities";

import {
  AddScheduleRepository,
  DeleteScheduleRepository,
  LoadScheduleByPageRepository,
  LoadScheduleRepository,
  UpdateScheduleRepository,
} from "./contracts";
export class ScheduleRepository
implements
        AddScheduleRepository,
        DeleteScheduleRepository,
        LoadScheduleByPageRepository,
        LoadScheduleRepository,
        UpdateScheduleRepository
{
  constructor(private readonly repository: Repository) {}
  async addSchedule(schedule: ScheduleData): Promise<ScheduleData | null> {
    return this.repository.add(schedule);
  }
  async deleteSchedule(query: Query): Promise<ScheduleData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadScheduleByPage(query: Query): Promise<SchedulePaginated | null> {

    const schedules = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { schedules, total };
  }
  async loadSchedule(query: Query): Promise<ScheduleData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateSchedule(query: Query, data: ScheduleData): Promise<ScheduleData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}