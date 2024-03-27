import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateClientController } from "@/slices/client/controllers";
import { makeUpdateClientFactory } from "@/slices/client/useCases";

export const makeUpdateClientController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateClient",
    new UpdateClientController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateClientFactory()
    )
  );
};
