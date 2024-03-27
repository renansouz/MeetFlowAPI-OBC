import { adaptRoute } from "@/application/adapters";
import {
  makeAddServiceController,
  makeDeleteServiceController,
  makeLoadServiceByPageController,
  makeLoadServiceController,
  makeUpdateServiceController,
} from "@/slices/service/controllers";

export const addServiceAdapter = () => adaptRoute(makeAddServiceController());
export const loadServiceAdapter = () => adaptRoute(makeLoadServiceController());
export const loadServiceByPageAdapter = () =>
  adaptRoute(makeLoadServiceByPageController());
export const deleteServiceAdapter = () => adaptRoute(makeDeleteServiceController());
export const updateServiceAdapter = () => adaptRoute(makeUpdateServiceController());