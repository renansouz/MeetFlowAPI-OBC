import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadServiceByPageController } from "@/slices/service/controllers";
import { makeLoadServiceByPageFactory } from "@/slices/service/useCases";

export const makeLoadServiceByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadServiceByPage",
    new LoadServiceByPageController(
      makeValidationComposite(requiredFields),
      makeLoadServiceByPageFactory()
    )
  );
};
