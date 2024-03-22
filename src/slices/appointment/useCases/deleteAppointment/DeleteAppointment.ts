import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { DeleteAppointmentRepository } from "@/slices/appointment/repositories";

export type DeleteAppointment = (query: Query) => Promise<AppointmentData | null>;

export type DeleteAppointmentSignature = (
    deleteAppointment: DeleteAppointmentRepository
) => DeleteAppointment;

export const deleteAppointment: DeleteAppointmentSignature =
    (deleteAppointmentRepository: DeleteAppointmentRepository) => (query: Query) => {
      return deleteAppointmentRepository.deleteAppointment(query);
    };