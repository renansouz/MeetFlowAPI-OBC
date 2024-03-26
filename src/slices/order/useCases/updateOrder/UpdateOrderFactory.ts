import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { UpdateOrder,updateOrder } from "@/slices/order/useCases";

export const makeUpdateOrderFactory = (): UpdateOrder => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return updateOrder(repository);
};