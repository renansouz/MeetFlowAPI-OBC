import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteRequestController } from "@/slices/request/controllers";
import { makeDeleteRequestFactory } from "@/slices/request/useCases";

export const makeDeleteRequestController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRequest",
    new DeleteRequestController(
      makeValidationComposite(requiredFields),
      makeDeleteRequestFactory()
    )
  );
};
