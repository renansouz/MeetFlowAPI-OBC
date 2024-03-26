import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateAppointmentController } from "@/slices/appointment/controllers";
import { makeUpdateAppointmentFactory } from "@/slices/appointment/useCases";

export const makeUpdateAppointmentController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateAppointment",
    new UpdateAppointmentController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateAppointmentFactory()
    )
  );
};
