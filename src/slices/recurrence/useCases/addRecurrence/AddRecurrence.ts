import { RecurrenceData,RecurrenceEntity } from "@/slices/recurrence/entities";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";

export type AddRecurrence = (data: RecurrenceData) => Promise<RecurrenceEntity | null>;

export type AddRecurrenceSignature = (
    addRecurrence: AddRecurrenceRepository
) => AddRecurrence;

export const addRecurrence: AddRecurrenceSignature =
    (addRecurrenceRepository: AddRecurrenceRepository) => (data: RecurrenceData) => {
      return addRecurrenceRepository.addRecurrence(new RecurrenceEntity(data));
    };
