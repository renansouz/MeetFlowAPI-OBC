import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRequestByPageController } from "@/slices/request/controllers";
import { makeLoadRequestByPageFactory } from "@/slices/request/useCases";

export const makeLoadRequestByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRequestByPage",
    new LoadRequestByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRequestByPageFactory()
    )
  );
};
