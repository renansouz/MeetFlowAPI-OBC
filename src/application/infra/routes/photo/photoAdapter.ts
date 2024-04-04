import { adaptRoute } from "@/application/adapters";
import {
  makeAddPhotoController,
  makeDeletePhotoController,
  makeUpdatePhotoController,
} from "@/slices/photo/controllers";

export const addPhotoAdapter = () => adaptRoute(makeAddPhotoController());
export const deletePhotoAdapter = () => adaptRoute(makeDeletePhotoController());
export const updatePhotoAdapter = () => adaptRoute(makeUpdatePhotoController());
