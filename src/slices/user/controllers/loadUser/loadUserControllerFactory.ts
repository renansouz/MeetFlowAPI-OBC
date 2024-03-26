import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadUserController } from "@/slices/user/controllers";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeLoadUserController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadUser",
    new LoadUserController(
      makeValidationComposite(requiredFields),
      makeLoadUserFactory()
    )
  );
};
