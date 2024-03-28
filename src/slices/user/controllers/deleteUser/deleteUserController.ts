import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
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
    if (httpRequest?.userId?.toString() !== httpRequest?.query?._id) {
      return unauthorized();
    }
    const userDeleted = await this.deleteUser({
      fields: {...httpRequest?.query, _id: httpRequest?.userId?.toString()},
      options: {},
    });
    return success(userDeleted);
  }
}
