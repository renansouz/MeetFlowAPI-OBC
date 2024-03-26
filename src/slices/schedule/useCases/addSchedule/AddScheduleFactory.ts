import { MongoRepository } from "@/application/infra";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { AddSchedule,addSchedule } from "@/slices/schedule/useCases";

export const makeAddScheduleFactory = (): AddSchedule => {
  const repository = new ScheduleRepository(new MongoRepository("schedule"));
  return addSchedule(repository);
};