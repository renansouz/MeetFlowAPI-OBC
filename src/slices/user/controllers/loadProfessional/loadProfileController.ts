import {
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadProfessional } from "@/slices/user/useCases";

export class LoadProfessionalController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadProfessional: LoadProfessional
  ) {
    super();
  }
  async execute(): Promise<HttpResponse<any>> {

    const appointmentLoaded = await this.loadProfessional();
    return success(appointmentLoaded);
  }
}