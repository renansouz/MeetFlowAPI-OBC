import { OrderData,OrderEntity } from "@/slices/order/entities";
import { AddOrderRepository } from "@/slices/order/repositories";

export type AddOrder = (data: OrderData) => Promise<OrderEntity | null>;

export type AddOrderSignature = (addOrder: AddOrderRepository) => AddOrder;

export const addOrder: AddOrderSignature =
    (addOrderRepository: AddOrderRepository) => (data: OrderData) => {
      return addOrderRepository.addOrder(new OrderEntity(data));
    };
