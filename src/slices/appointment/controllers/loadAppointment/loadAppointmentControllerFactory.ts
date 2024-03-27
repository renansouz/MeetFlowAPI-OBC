import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadAppointmentController } from "@/slices/appointment/controllers";
import { makeLoadAppointmentFactory } from "@/slices/appointment/useCases";

export const makeLoadAppointmentController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadAppointment",
    new LoadAppointmentController(
      makeValidationComposite(requiredFields),
      makeLoadAppointmentFactory()
    )
  );
};
