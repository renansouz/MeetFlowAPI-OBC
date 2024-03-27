import {
  Authentication,
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAccount } from "@/slices/account/useCases";
import { LoadUser } from "@/slices/user/useCases";

export class WhoAmIController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const accountExists = await this.loadAccount({
      fields: {
        createdById: httpRequest?.userId,
        refreshToken: httpRequest?.headers?.refreshtoken,
        isFutureexpiresAt: new Date(),
      },
      options: {},
    });
    // Bug referente a conta não existir
    // if (!accountExists) {
    //   return unauthorized();
    // }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    const user = await this.loadUser({
      fields: { _id: httpRequest?.userId as string },
      options: {},
    });
    console.log("User controller whoAmI", user);
    if (!user) {
      return unauthorized();
    }
    return success({ user });
  }
}