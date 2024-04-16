import { google } from "googleapis";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import {
  EmailInUseError,
  MissingParamError,
} from "@/application/errors";
import {
  addDays,
  Authentication,
  badRequest,
  forbidden,
  success,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { SignupController } from "./signupController";
describe("SignUpController", () => {
  let testInstance: SignupController;
  let addUser: jest.Mock;
  let loadUser: jest.Mock;
  let addAccount: jest.Mock;
  let authentication: MockProxy<Authentication>;
  let googleOAuthService: MockProxy<any>;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addUser = jest.fn();
    addUser.mockResolvedValue(fakeUserEntity);
    loadUser = jest.fn();
    loadUser.mockResolvedValue(null);
    addAccount = jest.fn();
    addAccount.mockResolvedValue(fakeAccountEntity);
    authentication = mock();
    validation = mock();
    authentication.auth.mockResolvedValue({
      accessToken: "fakeAccessToken",
      refreshToken: "fakeRefreshToken",
    });
    validation.validate.mockResolvedValue([] as never);
    googleOAuthService = mock();
    googleOAuthService.getGoogleOAuthToken.mockResolvedValue(
      new google.auth.OAuth2("fakeClientId ", "fakeClientSecret")
    );
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new SignupController(
      validation,
      addUser,
      loadUser,
      authentication,
      addAccount,
      googleOAuthService
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeUserEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addUser with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(addUser).toHaveBeenCalledWith(fakeUserEntity);
    expect(addUser).toHaveBeenCalledTimes(1);
  });
  test("should call loadUser with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(loadUser).toHaveBeenCalledWith({
      fields: { email: fakeUserEntity?.email },
      options: { projection: { password: 0 } },
    });
    expect(loadUser).toHaveBeenCalledTimes(1);
  });
  test("should call auth of authentication with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(authentication.auth).toHaveBeenCalledWith(
      fakeUserEntity?.email,
      fakeUserEntity?.password
    );
    expect(authentication.auth).toHaveBeenCalledTimes(1);
  });
  test("should call addAccount with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(addAccount).toHaveBeenCalledWith({
      createdById: fakeUserEntity?._id,
      name: fakeUserEntity?.name,
      refreshToken: "fakeRefreshToken",
      active: true,
      expiresAt: addDays(new Date(), 1),
    });
    expect(addAccount).toHaveBeenCalledTimes(1);
  });
  test("should return success if authentication signup succeeds", async () => {
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(
      success({
        user: fakeUserEntity,
        accessToken: "fakeAccessToken",
        refreshToken: "fakeRefreshToken",
      })
    );
  });
  test("should return error if authentication signup gots an error", async () => {
    addUser.mockRejectedValueOnce(new Error("fakeError"));
    const httpResponse = testInstance.execute({ body: fakeUserEntity });
    await expect(httpResponse).rejects.toThrow("fakeError");
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("email")]));
  });
  test("should return forbidden request if user exists", async () => {
    loadUser.mockResolvedValueOnce(fakeUserEntity);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });
  test("should return unauthorized if token is null", async () => {
    authentication.auth.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(unauthorized());
  });
});