import { MongoRepository } from "@/application/infra";
import { PhotoRepository } from "@/slices/photo/repositories";
import { updatePhoto, UpdatePhoto } from "@/slices/photo/useCases";

export const makeUpdatePhotoFactory = (): UpdatePhoto => {
  const repository = new PhotoRepository(new MongoRepository("photo"));
  return updatePhoto(repository);
};