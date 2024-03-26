/* eslint-disable no-unsafe-optional-chaining */
import { UserNotFound } from "@/application/errors";
import {
  addDays,
  Authentication,
  badRequest,
  forbidden,
  HttpRequest,
  HttpResponse,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddAccount } from "@/slices/account/useCases";
import { LoadUser } from "@/slices/user/useCases";

export class LoginController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body;

    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (userExists === null || userExists === undefined) {
      return forbidden(new UserNotFound());
    }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userExists?._id as string,
      name: userExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return success({ user: userExists, accessToken, refreshToken });
  }
}