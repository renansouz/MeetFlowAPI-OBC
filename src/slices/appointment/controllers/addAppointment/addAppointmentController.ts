import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddAppointment, ValidateAvailableTimesSchema } from "@/slices/appointment/useCases";
import { LoadSchedule } from "@/slices/schedule/useCases";

export class AddAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAppointment: AddAppointment,
    private readonly validateAvailableTimes: ValidateAvailableTimesSchema,
    private readonly loadSchedule: LoadSchedule
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    console.log("httpRequest controller addAppointment", httpRequest);
    const professionalSchedule = await this.loadSchedule({
      fields: { _id: httpRequest?.body?.scheduleId },
      options: {},
    });
  
    const professional = professionalSchedule?.createdById;
    console.log("professional", professional);
    const appointmentIsValid = await this.validateAvailableTimes({
      date: httpRequest?.body?.initDate,
      initDate: httpRequest?.body?.initDate,
      endDate: httpRequest?.body?.endDate,
      professionalId: professional,
      scheduleId: httpRequest?.body?.scheduleId,
      serviceId: httpRequest?.body?.serviceId,
    });
    console.log("appointmentIsValid", appointmentIsValid);
    if (!appointmentIsValid) {
      console.log("O horário não está disponível", appointmentIsValid);
      return badRequest(errors);
    }
    const appointmentCreated = await this.addAppointment({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return success(appointmentCreated);
  }
}
