import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadAvailableTimesController } from "@/slices/appointment/controllers";
import { makeLoadAvailableTimesFactory } from "@/slices/appointment/useCases";

export const makeLoadAvailableTimesController = (): Controller => {
  const requiredFields = ["professionalId", "date", "serviceId", "scheduleId"];
  return makeLogController(
    "loadAvailableTimes",
    new LoadAvailableTimesController(
      makeValidationComposite(requiredFields),
      makeLoadAvailableTimesFactory()
    )
  );
};