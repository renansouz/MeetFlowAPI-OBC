import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";
import { DeleteOrderRepository } from "@/slices/order/repositories";

export type DeleteOrder = (query: Query) => Promise<OrderData | null>;

export type DeleteOrderSignature = (deleteOrder: DeleteOrderRepository) => DeleteOrder;

export const deleteOrder: DeleteOrderSignature =
    (deleteOrderRepository: DeleteOrderRepository) => (query: Query) => {
      return deleteOrderRepository.deleteOrder(query);
    };
