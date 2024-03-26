import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddServiceController } from "@/slices/service/controllers";
import { makeAddServiceFactory } from "@/slices/service/useCases";

export const makeAddServiceController = (): Controller => {
  const requiredFields = [
    "name",
    "description",
    "price",
    "duration",
    "appointmentsTotal",
  ];
  return makeLogController(
    "addService",
    new AddServiceController(
      makeValidationComposite(requiredFields),
      makeAddServiceFactory()
    )
  );
};
