import { MongoRepository } from "@/application/infra";
import { PhotoRepository } from "@/slices/photo/repositories";
import { AddPhoto,addPhoto } from "@/slices/photo/useCases";

export const makeAddPhotoFactory = (): AddPhoto => {
  const repository = new PhotoRepository(new MongoRepository("photo"));
  return addPhoto(repository);
};