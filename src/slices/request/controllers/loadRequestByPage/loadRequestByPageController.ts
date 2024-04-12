import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRequestByPage } from "@/slices/request/useCases";

export class LoadRequestByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRequestByPage: LoadRequestByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", userId, status, ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page, userId, status };
    const requestLoaded = await this.loadRequestByPage({
      fields,
      options,
    });
    return success(requestLoaded);
  }
}
