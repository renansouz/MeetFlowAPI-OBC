import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteSchedule } from "@/slices/schedule/useCases";

export class DeleteScheduleController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteSchedule: DeleteSchedule
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const scheduleDeleteed = await this.deleteSchedule({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return success(scheduleDeleteed);
  }
}
