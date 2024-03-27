import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateScheduleController } from "@/slices/schedule/controllers";
import { makeUpdateScheduleFactory } from "@/slices/schedule/useCases";

export const makeUpdateScheduleController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateSchedule",
    new UpdateScheduleController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateScheduleFactory()
    )
  );
};
