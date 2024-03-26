import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { LoadAvailableTimes,loadAvailableTimes } from "@/slices/appointment/useCases";
import { ScheduleRepository } from "@/slices/schedule/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";

export const makeLoadAvailableTimesFactory = (): LoadAvailableTimes => {
  return loadAvailableTimes(
    new AppointmentRepository(new MongoRepository("appointment")),
    new ServiceRepository(new MongoRepository("service")),
    new UserRepository(new MongoRepository("user")),
    new ScheduleRepository(new MongoRepository("schedule"))
  );
};