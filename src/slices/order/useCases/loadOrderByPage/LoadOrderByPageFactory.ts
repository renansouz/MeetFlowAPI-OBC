import { MongoRepository } from "@/application/infra";
import { OrderRepository } from "@/slices/order/repositories";
import { LoadOrderByPage,loadOrderByPage } from "@/slices/order/useCases";

export const makeLoadOrderByPageFactory = (): LoadOrderByPage => {
  const repository = new OrderRepository(new MongoRepository("order"));
  return loadOrderByPage(repository);
};