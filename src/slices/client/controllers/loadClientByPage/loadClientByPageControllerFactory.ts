import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadClientByPageController } from "@/slices/client/controllers";
import { makeLoadClientByPageFactory } from "@/slices/client/useCases";

export const makeLoadClientByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadClientByPage",
    new LoadClientByPageController(
      makeValidationComposite(requiredFields),
      makeLoadClientByPageFactory()
    )
  );
};
