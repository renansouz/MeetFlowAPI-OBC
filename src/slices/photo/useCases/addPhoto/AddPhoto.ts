import { Delete,Uploader,UploadParams } from "@/application/infra";
import { PhotoData,PhotoEntity } from "@/slices/photo/entities";
import { AddPhotoRepository, DeletePhotoRepository } from "@/slices/photo/repositories";
import { LoadUserRepository  } from "@/slices/user/repositories";

export type AddPhoto = (data: PhotoData & UploadParams) => Promise<PhotoEntity | null>;

export type AddPhotoSignature = (addPhoto: AddPhotoRepository & DeletePhotoRepository,loadUserRepository: LoadUserRepository, uploader: Uploader, deleted: Delete) => AddPhoto;

export const addPhoto: AddPhotoSignature =
    (addPhotoRepository: AddPhotoRepository & DeletePhotoRepository,loadUserRepository: LoadUserRepository, uploader: Uploader, deleted: Delete) => async (data: PhotoData & UploadParams) => {

      // Get the existing photo
      const existingUser = await loadUserRepository.loadUser({
        fields: { _id: data?.createdById },
        options: {},
      });

      // If the user has a photo, delete it from Cloudflare
      if (existingUser?.photoUrl) {
        await deleted.delete({ fileName: existingUser.photoUrl });
        await addPhotoRepository.deletePhoto({
          fields: { url: existingUser.photoUrl },
          options: {},
        });
      }

      // Upload the file
      const { url } = await uploader.upload({
        fileName: data.fileName,
        fileType: data.fileType,
        body: data.body
      });

      // Add the photo
      return addPhotoRepository.addPhoto(new PhotoEntity({
        ...data,
        url
      }));
    };