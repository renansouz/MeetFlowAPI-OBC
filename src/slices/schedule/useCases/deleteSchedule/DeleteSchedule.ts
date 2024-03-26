import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";
import { DeleteScheduleRepository } from "@/slices/schedule/repositories";

export type DeleteSchedule = (query: Query) => Promise<ScheduleData | null>;

export type DeleteScheduleSignature = (deleteSchedule: DeleteScheduleRepository) => DeleteSchedule;

export const deleteSchedule: DeleteScheduleSignature =
    (deleteScheduleRepository: DeleteScheduleRepository) => (query: Query) => {
      return deleteScheduleRepository.deleteSchedule(query);
    };
