import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { LoadAppointmentByPage,loadAppointmentByPage } from "@/slices/appointment/useCases";

export const makeLoadAppointmentByPageFactory = (): LoadAppointmentByPage => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return loadAppointmentByPage(repository);
};