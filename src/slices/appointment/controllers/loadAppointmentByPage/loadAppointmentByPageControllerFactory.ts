import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadAppointmentByPageController } from "@/slices/appointment/controllers";
import { makeLoadAppointmentByPageFactory } from "@/slices/appointment/useCases";

export const makeLoadAppointmentByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadAppointmentByPage",
    new LoadAppointmentByPageController(
      makeValidationComposite(requiredFields),
      makeLoadAppointmentByPageFactory()
    )
  );
};
