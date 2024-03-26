import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeValidateAvailableTimesFactory } from "@/slices/appointment/useCases";
import { UpdateRequestController } from "@/slices/request/controllers";
import { makeUpdateRequestByIdFactory } from "@/slices/request/useCases";

export const makeUpdateRequestController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody = ["status"];
  return makeLogController(
    "updateRequest",
    new UpdateRequestController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRequestByIdFactory(),
      makeValidateAvailableTimesFactory()
    )
  );
};