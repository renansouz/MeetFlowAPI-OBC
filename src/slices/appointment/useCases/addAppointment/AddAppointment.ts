import { AppointmentData,AppointmentEntity } from "@/slices/appointment/entities";
import { AddAppointmentRepository } from "@/slices/appointment/repositories";

export type AddAppointment = (data: AppointmentData) => Promise<AppointmentEntity | null>;

export type AddAppointmentSignature = (addAppointment: AddAppointmentRepository) => AddAppointment;

export const addAppointment: AddAppointmentSignature =
    (addAppointmentRepository: AddAppointmentRepository) => (data: AppointmentData) => {
      return addAppointmentRepository.addAppointment(new AppointmentEntity({...data, active: true}));
    };