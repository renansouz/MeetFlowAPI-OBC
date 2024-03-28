import { adaptRoute } from "@/application/adapters";
import {
  makeAddOrderController,
  makeDeleteOrderController,
  makeLoadOrderByPageController,
  makeLoadOrderController,
  makeUpdateOrderController,
} from "@/slices/order/controllers";

export const addOrderAdapter = () => adaptRoute(makeAddOrderController());
export const loadOrderAdapter = () => adaptRoute(makeLoadOrderController());
export const loadOrderByPageAdapter = () => adaptRoute(makeLoadOrderByPageController());
export const deleteOrderAdapter = () => adaptRoute(makeDeleteOrderController());
export const updateOrderAdapter = () => adaptRoute(makeUpdateOrderController());
