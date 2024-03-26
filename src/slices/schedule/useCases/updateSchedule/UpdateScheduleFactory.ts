import { MongoRepository } from "@/application/infra";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { UpdateSchedule,updateSchedule } from "@/slices/schedule/useCases";

export const makeUpdateScheduleFactory = (): UpdateSchedule => {
  const repository = new ScheduleRepository(new MongoRepository("schedule"));
  return updateSchedule(repository);
};