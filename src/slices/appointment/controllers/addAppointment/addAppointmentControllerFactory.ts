import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddAppointmentController } from "@/slices/appointment/controllers";
import { makeAddAppointmentFactory, makeValidateAvailableTimesFactory } from "@/slices/appointment/useCases";
import { makeLoadScheduleFactory } from "@/slices/schedule/useCases";

export const makeAddAppointmentController = (): Controller => {
  const requiredFields = [
    "requestId",
    "serviceId",
    "scheduleId",
    "clientId",
    // "professionalId",
    "createdForId",
    "status",
    "initDate",
    "endDate",
  ];
  return makeLogController(
    "addAppointment",
    new AddAppointmentController(
      makeValidationComposite(requiredFields),
      makeAddAppointmentFactory(),
      makeValidateAvailableTimesFactory(),
      makeLoadScheduleFactory()
    )
  );
};
