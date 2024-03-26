import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { UpdateAppointmentRepository } from "@/slices/appointment/repositories";

export type UpdateAppointment = (
    query: Query,
    data: AppointmentData
) => Promise<AppointmentData | null>;

export type UpdateAppointmentSignature = (
    updateAppointment: UpdateAppointmentRepository
) => UpdateAppointment;

export const updateAppointment: UpdateAppointmentSignature =
    (updateAppointmentRepository: UpdateAppointmentRepository) =>
      async (query: Query, data: AppointmentData) => {
        return updateAppointmentRepository.updateAppointment(query, data);
      };