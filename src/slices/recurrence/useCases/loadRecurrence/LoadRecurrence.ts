import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { LoadRecurrenceRepository } from "@/slices/recurrence/repositories";

export type LoadRecurrence = (query: Query) => Promise<RecurrenceData | null>;

export type LoadRecurrenceSignature = (
    loadRecurrence: LoadRecurrenceRepository
) => LoadRecurrence;

export const loadRecurrence: LoadRecurrenceSignature =
    (loadRecurrenceRepository: LoadRecurrenceRepository) => async (query: Query) => {
      return loadRecurrenceRepository.loadRecurrence(query);
    };
