import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteClientController } from "@/slices/client/controllers";
import { makeDeleteClientFactory } from "@/slices/client/useCases";

export const makeDeleteClientController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteClient",
    new DeleteClientController(
      makeValidationComposite(requiredFields),
      makeDeleteClientFactory()
    )
  );
};
