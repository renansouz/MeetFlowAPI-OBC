import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadServiceController } from "@/slices/service/controllers";
import { makeLoadServiceFactory } from "@/slices/service/useCases";

export const makeLoadServiceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadService",
    new LoadServiceController(
      makeValidationComposite(requiredFields),
      makeLoadServiceFactory()
    )
  );
};
