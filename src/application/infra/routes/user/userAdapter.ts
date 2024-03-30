import { adaptRoute } from "@/application/adapters";
import {
  makeAddUserController,
  makeDeleteUserController,
  makeLoadProfessionalController,
  makeLoadUserByPageController,
  makeLoadUserController,
  makeUpdateUserController} from "@/slices/user/controllers";

export const addUserAdapter = () => adaptRoute(makeAddUserController());
export const loadUserAdapter = () => adaptRoute(makeLoadUserController());
export const loadUserByPageAdapter = () => adaptRoute(makeLoadUserByPageController());
export const loadProfessionalByPageAdapter = () => adaptRoute((makeLoadProfessionalController()));
export const deleteUserAdapter = () => adaptRoute(makeDeleteUserController());
export const updateUserAdapter = () => adaptRoute(makeUpdateUserController());