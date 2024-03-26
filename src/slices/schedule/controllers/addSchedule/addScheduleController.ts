import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddSchedule, LoadSchedule } from "@/slices/schedule/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/schedule/validations";

export class AddScheduleController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSchedule: AddSchedule,
    private readonly loadSchedule: LoadSchedule
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    daysValidator({ errors, body: httpRequest?.body });
    handleHoursErrors({ errors, body: httpRequest?.body });
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const scheduleExists = await this.loadSchedule({
      fields: { createdById: httpRequest?.userId },
      options: {},
    });
    if (scheduleExists) {
      return badRequest([{ field: "createdById", message: "Schedule already exists" }]);
    }
    const scheduleCreated = await this.addSchedule({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return success(scheduleCreated);
  }
}
