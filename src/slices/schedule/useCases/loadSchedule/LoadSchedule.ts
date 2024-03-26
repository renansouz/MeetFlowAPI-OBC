import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";
import { LoadScheduleRepository } from "@/slices/schedule/repositories";

export type LoadSchedule = (query: Query) => Promise<ScheduleData | null>;

export type LoadScheduleSignature = (loadSchedule: LoadScheduleRepository) => LoadSchedule;

export const loadSchedule: LoadScheduleSignature =
    (loadScheduleRepository: LoadScheduleRepository) => async (query: Query) => {
      return loadScheduleRepository.loadSchedule(query);
    };
