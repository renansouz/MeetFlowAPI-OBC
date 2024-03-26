import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { ValidateAvailableTimesSchema } from "@/slices/appointment/useCases";
import { IUpdateRequestById } from "@/slices/request/useCases";

export class UpdateRequestController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateRequest: IUpdateRequestById,
    private readonly validateAvailableTimes: ValidateAvailableTimesSchema
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const appointmentIsValid = await this.validateAvailableTimes({
      date: httpRequest?.body?.date,
      initDate: httpRequest?.body?.initDate,
      endDate: httpRequest?.body?.endDate,
      professionalId: httpRequest?.body?.professionalId,
      scheduleId: httpRequest?.body?.scheduleId,
      serviceId: httpRequest?.body?.serviceId,
    });
    let newStatus = httpRequest?.body?.status;
    const validStatusArray = ["solicitado"]; 
    if (!appointmentIsValid && validStatusArray?.includes?.(newStatus)) {
      return badRequest(errorsBody);
    }
    const confirmedStatusArray = ["confirmado"];
    // Se o status for confirmado e o agendamento não for válido, o status deve ser alterado para "Cancelado pelo profissional"
    if (!appointmentIsValid && confirmedStatusArray?.includes?.(newStatus)) {
      newStatus = "Cancelado pelo profissional";
    }
    const requestUpdated = await this.updateRequest.updateRequestById(
      httpRequest?.query?._id,
      {
        ...httpRequest?.body,
        updatedById: httpRequest?.userId,
        updatedByRole: httpRequest?.userLogged?.role,
        status: newStatus,
      }
    );
    return success(requestUpdated);
  }
}