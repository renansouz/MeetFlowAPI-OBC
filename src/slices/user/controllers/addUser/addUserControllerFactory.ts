import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddUserController } from "@/slices/user/controllers";
import { makeAddUserFactory } from "@/slices/user/useCases";

export const makeAddUserController = (): Controller => {
  const requiredFields = ["name", "email", "password", "role"];
  return makeLogController(
    "addUser",
    new AddUserController(
      makeValidationComposite(requiredFields),
      makeAddUserFactory()
    )
  );
};
