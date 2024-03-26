import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";
import { UpdateScheduleRepository } from "@/slices/schedule/repositories";

export type UpdateSchedule = (
    query: Query,
    data: ScheduleData
) => Promise<ScheduleData | null>;

export type UpdateScheduleSignature = (
    updateSchedule: UpdateScheduleRepository
) => UpdateSchedule;

export const updateSchedule: UpdateScheduleSignature =
    (updateScheduleRepository: UpdateScheduleRepository) =>
      async (query: Query, data: ScheduleData) => {
        return updateScheduleRepository.updateSchedule(query, data);
      };