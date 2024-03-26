import { MongoRepository } from "@/application/infra";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { DeleteSchedule,deleteSchedule } from "@/slices/schedule/useCases";

export const makeDeleteScheduleFactory = (): DeleteSchedule => {
  const repository = new ScheduleRepository(new MongoRepository("schedule"));
  return deleteSchedule(repository);
};