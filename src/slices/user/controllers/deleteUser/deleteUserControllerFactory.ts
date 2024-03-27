import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteUserController } from "@/slices/user/controllers";
import { makeDeleteUserFactory } from "@/slices/user/useCases";

export const makeDeleteUserController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteUser",
    new DeleteUserController(
      makeValidationComposite(requiredFields),
      makeDeleteUserFactory()
    )
  );
};
