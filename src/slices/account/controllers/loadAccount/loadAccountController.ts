/* eslint-disable no-unsafe-optional-chaining */
import {
  addDays,
  Authentication,
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddAccount,LoadAccount } from "@/slices/account/useCases";

export class LoadAccountController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    console.log("httpRequest", httpRequest);
    const accountExists = await this.loadAccount({
      fields: {
        createdById: httpRequest?.userId,
        refreshToken: httpRequest?.headers?.refreshtoken,
        expiresAt: new Date(),
      },
      options: {},
    });
    // Bug referente a conta não existir
    // console.log("accountExists", accountExists);
    // if (!accountExists) {
    //   console.log("A conta não existe", accountExists);
    //   return unauthorized();
    // }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: httpRequest?.userId as string,
      name: accountExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return success({ accessToken, refreshToken });
  }
}
