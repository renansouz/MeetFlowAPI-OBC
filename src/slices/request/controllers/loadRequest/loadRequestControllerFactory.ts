import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRequestController } from "@/slices/request/controllers";
import { makeLoadRequestFactory } from "@/slices/request/useCases";

export const makeLoadRequestController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRequest",
    new LoadRequestController(
      makeValidationComposite(requiredFields),
      makeLoadRequestFactory()
    )
  );
};
