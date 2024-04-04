import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { R2Storage } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { DeletePhotoController } from "@/slices/photo/controllers";
import { makeDeletePhotoFactory } from "@/slices/photo/useCases";
import { makeUpdateUserFactory } from "@/slices/user/useCases";

export const makeDeletePhotoController = (): Controller => {
  const uploader = new R2Storage();
  const requiredFields = ["url"];
  return makeLogController(
    "deletePhoto",
    new DeletePhotoController(
      makeValidationComposite(requiredFields),
      makeDeletePhotoFactory(),
      uploader,
      makeUpdateUserFactory()
    )
  );
};
