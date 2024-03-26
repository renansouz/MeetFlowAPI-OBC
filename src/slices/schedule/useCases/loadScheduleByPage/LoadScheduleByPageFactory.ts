import { MongoRepository } from "@/application/infra";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { LoadScheduleByPage,loadScheduleByPage } from "@/slices/schedule/useCases";

export const makeLoadScheduleByPageFactory = (): LoadScheduleByPage => {
  const repository = new ScheduleRepository(new MongoRepository("schedule"));
  return loadScheduleByPage(repository);
};