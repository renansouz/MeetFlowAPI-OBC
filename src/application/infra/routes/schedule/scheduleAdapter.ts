import { adaptRoute } from "@/application/adapters";
import {
  makeAddScheduleController,
  makeDeleteScheduleController,
  makeLoadScheduleByPageController,
  makeLoadScheduleController,
  makeUpdateScheduleController,
} from "@/slices/schedule/controllers";

export const addScheduleAdapter = () => adaptRoute(makeAddScheduleController());
export const loadScheduleAdapter = () => adaptRoute(makeLoadScheduleController());
export const loadScheduleByPageAdapter = () => adaptRoute(makeLoadScheduleByPageController());
export const deleteScheduleAdapter = () => adaptRoute(makeDeleteScheduleController());
export const updateScheduleAdapter = () => adaptRoute(makeUpdateScheduleController());
