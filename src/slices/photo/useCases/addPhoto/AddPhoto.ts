import { PhotoData,PhotoEntity } from "@/slices/photo/entities";
import { AddPhotoRepository } from "@/slices/photo/repositories";

export type AddPhoto = (data: PhotoData) => Promise<PhotoEntity | null>;
export type AddPhotoSignature = (addPhoto: AddPhotoRepository) => AddPhoto;
export const addPhoto: AddPhotoSignature =
    (addPhotoRepository: AddPhotoRepository) => (data: PhotoData) => {
      return addPhotoRepository.addPhoto(new PhotoEntity(data));
    };