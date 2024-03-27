import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadScheduleController } from "@/slices/schedule/controllers";
import { makeLoadScheduleFactory } from "@/slices/schedule/useCases";

export const makeLoadScheduleController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadSchedule",
    new LoadScheduleController(
      makeValidationComposite(requiredFields),
      makeLoadScheduleFactory()
    )
  );
};
