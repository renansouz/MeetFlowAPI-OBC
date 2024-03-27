import { adaptRoute } from "@/application/adapters";
import {
  makeAddAppointmentController,
  makeDeleteAppointmentController,
  makeLoadAppointmentByPageController,
  makeLoadAppointmentController,
  makeUpdateAppointmentController,
} from "@/slices/appointment/controllers";

export const addAppointmentAdapter = () => adaptRoute(makeAddAppointmentController());
export const loadAppointmentAdapter = () => adaptRoute(makeLoadAppointmentController());
export const loadAppointmentByPageAdapter = () =>
  adaptRoute(makeLoadAppointmentByPageController());
export const deleteAppointmentAdapter = () => adaptRoute(makeDeleteAppointmentController());
export const updateAppointmentAdapter = () => adaptRoute(makeUpdateAppointmentController());