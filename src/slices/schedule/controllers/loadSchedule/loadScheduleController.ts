import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadSchedule } from "@/slices/schedule/useCases";

export class LoadScheduleController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadSchedule: LoadSchedule
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const scheduleLoaded = await this.loadSchedule({
      fields: httpRequest?.query,
      options: {},
    });
    return success(scheduleLoaded);
  }
}
