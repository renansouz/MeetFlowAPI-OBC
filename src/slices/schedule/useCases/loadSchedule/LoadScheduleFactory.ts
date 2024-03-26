import { MongoRepository } from "@/application/infra";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { LoadSchedule,loadSchedule } from "@/slices/schedule/useCases";

export const makeLoadScheduleFactory = (): LoadSchedule => {
  const repository = new ScheduleRepository(new MongoRepository("schedule"));
  return loadSchedule(repository);
};