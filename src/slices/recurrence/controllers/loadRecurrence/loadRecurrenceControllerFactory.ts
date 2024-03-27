import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRecurrenceController } from "@/slices/recurrence/controllers";
import { makeLoadRecurrenceFactory } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRecurrence",
    new LoadRecurrenceController(
      makeValidationComposite(requiredFields),
      makeLoadRecurrenceFactory()
    )
  );
};
