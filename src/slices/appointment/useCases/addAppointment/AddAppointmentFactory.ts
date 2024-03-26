import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { AddAppointment,addAppointment } from "@/slices/appointment/useCases";

export const makeAddAppointmentFactory = (): AddAppointment => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return addAppointment(repository);
};