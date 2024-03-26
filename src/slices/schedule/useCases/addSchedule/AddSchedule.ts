import { ScheduleData,ScheduleEntity } from "@/slices/schedule/entities";
import { AddScheduleRepository } from "@/slices/schedule/repositories";

export type AddSchedule = (data: ScheduleData) => Promise<ScheduleEntity | null>;

export type AddScheduleSignature = (addSchedule: AddScheduleRepository) => AddSchedule;

export const addSchedule: AddScheduleSignature =
    (addScheduleRepository: AddScheduleRepository) => (data: ScheduleData) => {
      return addScheduleRepository.addSchedule(new ScheduleEntity(data));
    };
