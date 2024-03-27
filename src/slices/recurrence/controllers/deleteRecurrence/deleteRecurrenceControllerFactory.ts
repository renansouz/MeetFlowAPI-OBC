import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteRecurrenceController } from "@/slices/recurrence/controllers";
import { makeDeleteRecurrenceFactory } from "@/slices/recurrence/useCases";

export const makeDeleteRecurrenceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRecurrence",
    new DeleteRecurrenceController(
      makeValidationComposite(requiredFields),
      makeDeleteRecurrenceFactory()
    )
  );
};
