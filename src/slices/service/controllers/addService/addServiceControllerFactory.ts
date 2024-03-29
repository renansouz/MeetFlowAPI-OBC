import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddServiceController } from "@/slices/service/controllers";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { makeLoadUserFactory, makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeAddServiceController = (): Controller => {
  const requiredFields = [
    "name",
    "description",
    "price",
    "duration",
  ];
  return makeLogController(
    "addService",
    new AddServiceController(
      makeValidationComposite(requiredFields),
      makeAddServiceFactory(),
      makeLoadUserFactory(),
      makeUpdateUserFactory()
    )
  );
};
