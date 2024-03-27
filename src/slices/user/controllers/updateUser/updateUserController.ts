/* eslint-disable no-unsafe-optional-chaining */
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateUser } from "@/slices/user/useCases";

export class UpdateUserController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateUser: UpdateUser
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
    console.log("httpRequest método update user", httpRequest);
    const query =
      httpRequest?.userLogged?.role === "admin"
        ? httpRequest?.query
        : {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        };
    const userUpdated = await this.updateUser(
      { fields: query, options: {} },
      httpRequest?.body
    );
    if (userUpdated) {
      return success(userUpdated);
    }
    const myUserUpdated = await this.updateUser(
      { fields: { _id: httpRequest?.userId }, options: {} },
      httpRequest?.body
    );
    return success(myUserUpdated);
  }
}
