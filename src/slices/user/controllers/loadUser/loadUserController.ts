import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases";

export class LoadUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    console.log("httpRequest load User Controller", httpRequest);
    if (httpRequest?.userLogged?.role === "admin") {
      const userLoaded = await this.loadUser({
        fields: { ...httpRequest?.query },
        options: {},
      });
      return success(userLoaded);
    }
    if (httpRequest?.userId?.toString() !== httpRequest?.query?._id) {
      return unauthorized();
    }
    const userLoaded = await this.loadUser({
      fields: {...httpRequest?.query, _id: httpRequest?.userId?.toString()},
      options: {},
    });
    return success(userLoaded);
  }
}
