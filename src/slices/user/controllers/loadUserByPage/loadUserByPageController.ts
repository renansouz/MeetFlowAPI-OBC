import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUserByPage } from "@/slices/user/useCases";

export class LoadUserByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserByPage: LoadUserByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    // Debater sobre usuário ver todos os usuários
    // if (httpRequest?.userLogged?.role === "admin") {
    //   const userLoaded = await this.loadUserByPage({
    //     fields,
    //     options,
    //   });
    //   return success(userLoaded);
    // }
    // if (httpRequest?.userId !== httpRequest?.query?._id) {
    //   return unauthorized();
    // }
    const userLoaded = await this.loadUserByPage({
      fields,
      options,
    });
    return success(userLoaded);
  }
}