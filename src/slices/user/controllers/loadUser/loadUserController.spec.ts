import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, unauthorized, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LoadUserController } from "./loadUserController";

describe("LoadUserController", () => {
  let testInstance: LoadUserController;
  let loadUser: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadUser = jest.fn();
    loadUser.mockResolvedValue(fakeUserEntity);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeUserEntity._id };
    testInstance = new LoadUserController(validation, loadUser);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadUser with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success(fakeUserEntity)
    );
    expect(loadUser).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadUser).toHaveBeenCalledTimes(1);
  });
  test("should throws if loadUser throw", async () => {
    loadUser.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
});
