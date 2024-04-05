import { adaptRoute } from "@/application/adapters";
import {
  makeAddPhotoController,
  makeDeletePhotoController,
} from "@/slices/photo/controllers";

export const addPhotoAdapter = () => adaptRoute(makeAddPhotoController());
export const deletePhotoAdapter = () => adaptRoute(makeDeletePhotoController());
