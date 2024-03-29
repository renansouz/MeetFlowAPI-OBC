import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddScheduleController } from "@/slices/schedule/controllers";
import { makeAddScheduleFactory, makeLoadScheduleFactory } from "@/slices/schedule/useCases";
import { makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeAddScheduleController = (): Controller => {
  const requiredFields = [
    "days1",
    "hourStart1",
    "hourEnd1",
  ];
  return makeLogController(
    "addSchedule",
    new AddScheduleController(
      makeValidationComposite(requiredFields),
      makeAddScheduleFactory(),
      makeLoadScheduleFactory(),
      makeUpdateUserFactory()
    )
  );
};
