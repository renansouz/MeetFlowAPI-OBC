import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteOrderController } from "@/slices/order/controllers";
import { makeDeleteOrderFactory } from "@/slices/order/useCases";

export const makeDeleteOrderController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteOrder",
    new DeleteOrderController(
      makeValidationComposite(requiredFields),
      makeDeleteOrderFactory()
    )
  );
};
