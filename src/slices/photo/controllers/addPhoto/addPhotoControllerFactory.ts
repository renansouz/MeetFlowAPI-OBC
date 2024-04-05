import { makeLogController } from "@/application/decorators/logControllerFactory";
import { Controller } from "@/application/infra/contracts";
import { AddPhotoController } from "@/slices/photo/controllers";
import { makeAddPhotoFactory } from "@/slices/photo/useCases";
import { makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeAddPhotoController = (): Controller => {

  return makeLogController(
    "addPhoto",
    new AddPhotoController(
      makeAddPhotoFactory(),
      makeUpdateUserFactory(),
    )
  );
};
