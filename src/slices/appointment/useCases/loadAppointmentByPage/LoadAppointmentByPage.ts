import { Query } from "@/application/types";
import { AppointmentPaginated } from "@/slices/appointment/entities";
import { LoadAppointmentByPageRepository } from "@/slices/appointment/repositories";

export type LoadAppointmentByPage = (query: Query) => Promise<AppointmentPaginated | null>;

export type LoadAppointmentByPageSignature = (
    loadAppointmentByPage: LoadAppointmentByPageRepository
) => LoadAppointmentByPage;

export const loadAppointmentByPage: LoadAppointmentByPageSignature =
    (loadAppointmentByPageRepository: LoadAppointmentByPageRepository) =>
      async (query: Query) => {
        return loadAppointmentByPageRepository.loadAppointmentByPage(query);
      };