import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteServiceController } from "@/slices/service/controllers";
import { makeDeleteServiceFactory } from "@/slices/service/useCases";

export const makeDeleteServiceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteService",
    new DeleteServiceController(
      makeValidationComposite(requiredFields),
      makeDeleteServiceFactory()
    )
  );
};
