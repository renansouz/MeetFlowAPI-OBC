import { UnauthorizedError } from "@/application/errors";
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteUser } from "@/slices/user/useCases";

export class DeleteUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteUser: DeleteUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    if (httpRequest?.userLogged?.role === "admin") {
      const userDeleted = await this.deleteUser({
        fields: { ...httpRequest?.query },
        options: {},
      });
      return success(userDeleted);
    }
    if (httpRequest?.userId !== httpRequest?.query?._id) {
      return badRequest(UnauthorizedError);
    }
    const userDeleteed = await this.deleteUser({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return success(userDeleteed);
  }
}
