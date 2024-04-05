import { Delete } from "@/application/infra";
import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";
import { DeletePhotoRepository } from "@/slices/photo/repositories";

export type DeletePhoto = (query: Query, fileName: string) => Promise<PhotoData | null>;

export type DeletePhotoSignature = (
  deletePhoto: DeletePhotoRepository,
  deleted: Delete
) => DeletePhoto;

export const deletePhoto: DeletePhotoSignature =
(deletePhotoRepository: DeletePhotoRepository, deleted: Delete) => async (query: Query, fileName: string) => {
  await deleted.delete({ fileName });
  return deletePhotoRepository.deletePhoto(query);
};