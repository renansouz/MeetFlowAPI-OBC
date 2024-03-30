import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadProfessionalController } from "@/slices/user/controllers";
import { makeLoadProfessionalFactory } from "@/slices/user/useCases";

export const makeLoadProfessionalController = (): Controller => {
  const requiredFields = [""];
  return makeLogController(
    "loadProfessional",
    new LoadProfessionalController(makeValidationComposite(requiredFields), makeLoadProfessionalFactory())
  );
};
