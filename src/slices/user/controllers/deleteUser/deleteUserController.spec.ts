import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, unauthorized, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { DeleteUserController } from "./deleteUserController";

describe("DeleteUserController", () => {
  let testInstance: DeleteUserController;
  let deleteUser: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteUser = jest.fn();
    deleteUser.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeUserEntity._id };
    testInstance = new DeleteUserController(validation, deleteUser);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteUser with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(success(true));
    expect(deleteUser).toHaveBeenCalledWith({
      fields: { ...fakeQuery },
      options: {},
    });
    expect(deleteUser).toHaveBeenCalledTimes(1);
  });
  test("should return an incorrect request if the user tries to change data for another user and is not admin", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: "IdNotExists",
    });
    expect(result).toEqual(unauthorized());
  });
  test("should allow admin to delete another user's account", async () => {
    // Simular que o usuário logado é um administrador
    const adminUser = { _id: "adminId", role: "admin" };

    const result = await testInstance.execute({
      query: { _id: "userIdToBeDeleted" },
      userId: fakeUserEntity?._id,
      userLogged: adminUser, // Simular o usuário logado como administrador
    });

    expect(result).toEqual(success(true));
    expect(deleteUser).toHaveBeenCalledWith({
      fields: {  _id: "userIdToBeDeleted" },
      options: {},
    });
    expect(deleteUser).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteUser throw", async () => {
    deleteUser.mockRejectedValueOnce(new Error("error"));
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
