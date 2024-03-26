import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { UpdateAppointment,updateAppointment } from "@/slices/appointment/useCases";

export const makeUpdateAppointmentFactory = (): UpdateAppointment => {
  const repository = new AppointmentRepository(new MongoRepository("appointment"));
  return updateAppointment(repository);
};