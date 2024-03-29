/* eslint-disable no-unsafe-optional-chaining */
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddService } from "@/slices/service/useCases";
import { LoadUser, UpdateUser } from "@/slices/user/useCases";


export class AddServiceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addService: AddService,
    private readonly loadUser: LoadUser,
    private readonly updateUser: UpdateUser,
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const userMySchedule = await this.loadUser({
      fields: { _id: httpRequest?.userId },
      options: {},
    });

    if (!userMySchedule?.myScheduleId) {
      return badRequest("User does not have a schedule");
    }

    const serviceCreated = await this.addService({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });

    await this.updateUser(
      {
        fields: { _id: httpRequest?.userId },
        options: {},
      },
      { serviceIds: [...(userMySchedule.serviceIds ?? []), serviceCreated?._id ?? ""]}
    );
    return success(serviceCreated);
  }
}
