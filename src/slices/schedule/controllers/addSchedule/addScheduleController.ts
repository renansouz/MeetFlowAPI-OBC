import {
  badRequest,
  HttpRequest,
  HttpResponse,
  serverError,
  success,
  Validation} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddSchedule, LoadSchedule } from "@/slices/schedule/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/schedule/validations";
import { UpdateUser } from "@/slices/user/useCases";

export class AddScheduleController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSchedule: AddSchedule,
    private readonly loadSchedule: LoadSchedule,
    private readonly updateUser: UpdateUser


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
    console.log("testando testando");
    const scheduleExists = await this.loadSchedule({
      fields: { createdById: httpRequest?.userId },
      options: {},
    });
    if (scheduleExists && httpRequest?.userLogged?.role !== "admin") {
      return badRequest([{ field: "createdById", message: "Schedule already exists" }]);
    }
    const scheduleCreated = await this.addSchedule({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    console.log("scheduleCreated controller Schedule", scheduleCreated);
    if (scheduleCreated) {
      console.log("Antes do updated no user controller Schedule", scheduleCreated);
      const userUpdated = await this.updateUser(
        {
          fields: { _id: httpRequest?.userId },
          options: {},
        },
        {myScheduleId: scheduleCreated._id}
      );
      console.log("userUpdated controller Schedule", userUpdated);
      if (!userUpdated) {
        return serverError(new Error("User not updated"));
      };
    }
    return success(scheduleCreated);
  }
}
