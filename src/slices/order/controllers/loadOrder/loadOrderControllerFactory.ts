import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadOrderController } from "@/slices/order/controllers";
import { makeLoadOrderFactory } from "@/slices/order/useCases";

export const makeLoadOrderController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadOrder",
    new LoadOrderController(
      makeValidationComposite(requiredFields),
      makeLoadOrderFactory()
    )
  );
};
