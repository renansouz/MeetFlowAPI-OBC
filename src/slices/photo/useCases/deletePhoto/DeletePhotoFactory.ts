import { MongoRepository, R2Storage } from "@/application/infra";
import { PhotoRepository } from "@/slices/photo/repositories";
import { DeletePhoto,deletePhoto } from "@/slices/photo/useCases";

export const makeDeletePhotoFactory = (): DeletePhoto => {
  const uploader = new R2Storage();

  const repository = new PhotoRepository(new MongoRepository("photo"));
  return deletePhoto(repository,uploader);
};