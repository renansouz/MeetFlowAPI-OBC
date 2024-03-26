import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { DeleteOrder,deleteOrder } from "@/slices/order/useCases";

export const makeDeleteOrderFactory = (): DeleteOrder => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return deleteOrder(repository);
};