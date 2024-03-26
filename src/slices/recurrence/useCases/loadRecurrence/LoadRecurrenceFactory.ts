import { MongoRepository } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { LoadRecurrence,loadRecurrence } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceFactory = (): LoadRecurrence => {
  const repository = new RecurrenceRepository(new MongoRepository("recurrence"));
  return loadRecurrence(repository);
};