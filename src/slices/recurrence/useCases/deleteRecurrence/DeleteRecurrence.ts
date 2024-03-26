import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { DeleteRecurrenceRepository } from "@/slices/recurrence/repositories";

export type DeleteRecurrence = (query: Query) => Promise<RecurrenceData | null>;

export type DeleteRecurrenceSignature = (
    deleteRecurrence: DeleteRecurrenceRepository
) => DeleteRecurrence;

export const deleteRecurrence: DeleteRecurrenceSignature =
    (deleteRecurrenceRepository: DeleteRecurrenceRepository) => (query: Query) => {
      return deleteRecurrenceRepository.deleteRecurrence(query);
    };
