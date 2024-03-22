import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";
import { LoadAppointmentRepository } from "@/slices/appointment/repositories";

export type LoadAppointment = (query: Query) => Promise<AppointmentData | null>;

export type LoadAppointmentSignature = (loadAppointment: LoadAppointmentRepository) => LoadAppointment;

export const loadAppointment: LoadAppointmentSignature =
    (loadAppointmentRepository: LoadAppointmentRepository) => async (query: Query) => {
      return loadAppointmentRepository.loadAppointment(query);
    };