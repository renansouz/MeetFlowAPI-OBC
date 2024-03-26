import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddClientController } from "@/slices/client/controllers";
import { makeAddClientFactory } from "@/slices/client/useCases";

export const makeAddClientController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addClient",
    new AddClientController(
      makeValidationComposite(requiredFields),
      makeAddClientFactory()
    )
  );
};
