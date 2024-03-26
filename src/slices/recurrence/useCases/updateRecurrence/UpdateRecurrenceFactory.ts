import { MongoRepository } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { UpdateRecurrence,updateRecurrence } from "@/slices/recurrence/useCases";

export const makeUpdateRecurrenceFactory = (): UpdateRecurrence => {
  const repository = new RecurrenceRepository(new MongoRepository("recurrence"));
  return updateRecurrence(repository);
};