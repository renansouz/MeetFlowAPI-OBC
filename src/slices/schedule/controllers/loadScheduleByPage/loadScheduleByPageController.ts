import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadScheduleByPage } from "@/slices/schedule/useCases";

export class LoadScheduleByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadScheduleByPage: LoadScheduleByPage
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
    const scheduleLoaded = await this.loadScheduleByPage({
      fields,
      options,
    });
    return success(scheduleLoaded);
  }
}
