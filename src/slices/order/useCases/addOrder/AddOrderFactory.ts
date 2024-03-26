import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { AddOrder,addOrder } from "@/slices/order/useCases";

export const makeAddOrderFactory = (): AddOrder => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return addOrder(repository);
};