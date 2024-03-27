import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRecurrenceByPageController } from "@/slices/recurrence/controllers";
import { makeLoadRecurrenceByPageFactory } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRecurrenceByPage",
    new LoadRecurrenceByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRecurrenceByPageFactory()
    )
  );
};
