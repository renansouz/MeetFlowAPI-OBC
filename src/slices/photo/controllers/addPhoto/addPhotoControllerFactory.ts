import { makeLogController } from "@/application/decorators/logControllerFactory";
import { R2Storage } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { AddPhotoController } from "@/slices/photo/controllers";
import { makeAddPhotoFactory } from "@/slices/photo/useCases";
import { makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeAddPhotoController = (): Controller => {
  const uploader = new R2Storage();

  return makeLogController(
    "addPhoto",
    new AddPhotoController(
      makeAddPhotoFactory(),
      makeUpdateUserFactory(),
      uploader
    )
  );
};
