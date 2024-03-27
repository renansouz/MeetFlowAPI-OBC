import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteScheduleController } from "@/slices/schedule/controllers";
import { makeDeleteScheduleFactory } from "@/slices/schedule/useCases";

export const makeDeleteScheduleController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteSchedule",
    new DeleteScheduleController(
      makeValidationComposite(requiredFields),
      makeDeleteScheduleFactory()
    )
  );
};
