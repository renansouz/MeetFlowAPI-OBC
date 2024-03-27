import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteAppointmentController } from "@/slices/appointment/controllers";
import { makeDeleteAppointmentFactory } from "@/slices/appointment/useCases";

export const makeDeleteAppointmentController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteAppointment",
    new DeleteAppointmentController(
      makeValidationComposite(requiredFields),
      makeDeleteAppointmentFactory()
    )
  );
};
