import { MongoRepository, R2Storage } from "@/application/infra";
import { PhotoRepository } from "@/slices/photo/repositories";
import { AddPhoto,addPhoto } from "@/slices/photo/useCases";
import { UserRepository } from "@/slices/user/repositories";

export const makeAddPhotoFactory = (): AddPhoto => {
  const uploader = new R2Storage();
  const repository = new PhotoRepository(new MongoRepository("photo"));
  const userRepository = new UserRepository(new MongoRepository("user"));

  return addPhoto(repository, userRepository, uploader, uploader );
};
