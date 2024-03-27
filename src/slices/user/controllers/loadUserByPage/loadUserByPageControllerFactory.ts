import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadUserByPageController } from "@/slices/user/controllers";
import { makeLoadUserByPageFactory } from "@/slices/user/useCases";

export const makeLoadUserByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadUserByPage",
    new LoadUserByPageController(
      makeValidationComposite(requiredFields),
      makeLoadUserByPageFactory()
    )
  );
};
