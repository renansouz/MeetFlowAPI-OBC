import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadScheduleByPageController } from "@/slices/schedule/controllers";
import { makeLoadScheduleByPageFactory } from "@/slices/schedule/useCases";

export const makeLoadScheduleByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadScheduleByPage",
    new LoadScheduleByPageController(
      makeValidationComposite(requiredFields),
      makeLoadScheduleByPageFactory()
    )
  );
};
