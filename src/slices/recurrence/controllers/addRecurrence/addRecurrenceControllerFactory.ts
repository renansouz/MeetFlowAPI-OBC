import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddRecurrenceController } from "@/slices/recurrence/controllers";
import { makeAddRecurrenceFactory } from "@/slices/recurrence/useCases";

export const makeAddRecurrenceController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRecurrence",
    new AddRecurrenceController(
      makeValidationComposite(requiredFields),
      makeAddRecurrenceFactory()
    )
  );
};
