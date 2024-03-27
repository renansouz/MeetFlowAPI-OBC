import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadOrderByPageController } from "@/slices/order/controllers";
import { makeLoadOrderByPageFactory } from "@/slices/order/useCases";

export const makeLoadOrderByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadOrderByPage",
    new LoadOrderByPageController(
      makeValidationComposite(requiredFields),
      makeLoadOrderByPageFactory()
    )
  );
};
