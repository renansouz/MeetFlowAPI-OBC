import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddAppointmentController } from "@/slices/appointment/controllers";
import { makeAddAppointmentFactory } from "@/slices/appointment/useCases";

export const makeAddAppointmentController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addAppointment",
    new AddAppointmentController(
      makeValidationComposite(requiredFields),
      makeAddAppointmentFactory()
    )
  );
};
