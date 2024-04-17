import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { GoogleOAuthService } from "@/application/infra/oAuth";
import { makeLoadAccountFactory } from "@/slices/account/useCases";
import { makeUpdateAccountFactory } from "@/slices/account/useCases"; 
import { AddAppointmentController } from "@/slices/appointment/controllers";
import { makeAddAppointmentFactory, makeValidateAvailableTimesFactory } from "@/slices/appointment/useCases";

export const makeAddAppointmentController = (): Controller => {
  const requiredFields = [
    "requestId",
    "serviceId",
    "scheduleId",
    "professionalId",
    "clientId",
    "status",
    "initDate",
    "endDate",
  ];
  const loadAccount = makeLoadAccountFactory();
  const updateAccount = makeUpdateAccountFactory();
  const googleOAuthService = new GoogleOAuthService(loadAccount, updateAccount);
  return makeLogController(
    "addAppointment",
    new AddAppointmentController(
      makeValidationComposite(requiredFields),
      makeAddAppointmentFactory(),
      makeValidateAvailableTimesFactory(),
      googleOAuthService
    )
  );
};
