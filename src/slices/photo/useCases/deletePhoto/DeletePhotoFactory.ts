import { MongoRepository } from "@/application/infra";
import { PhotoRepository } from "@/slices/photo/repositories";
import { deletePhoto, DeletePhoto } from "@/slices/photo/useCases";

export const makeDeletePhotoFactory = (): DeletePhoto => {
  const repository = new PhotoRepository(new MongoRepository("photo"));
  return deletePhoto(repository);
};