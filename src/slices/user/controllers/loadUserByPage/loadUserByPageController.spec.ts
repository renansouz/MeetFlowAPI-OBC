import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import {
  fakeUserEntity,
  fakeUserPaginated,
} from "@/slices/user/entities/UserEntity.spec";

import { LoadUserByPageController } from "./loadUserByPageController";

describe("LoadUserByPageController", () => {
  let testInstance: LoadUserByPageController;
  let loadUserByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadUserByPage = jest.fn();
    loadUserByPage.mockResolvedValue(fakeUserPaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQueryParams = { _id: fakeUserEntity._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadUserByPageController(validation, loadUserByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadUserByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(success(fakeUserPaginated));
    expect(loadUserByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
    });
    expect(loadUserByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadUserByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(success(fakeUserPaginated));
    expect(loadUserByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: -1 }, page: fakeRestQuery?.page },
    });
    expect(loadUserByPage).toHaveBeenCalledTimes(1);
  });
  // Debater sobre usuário ver todos os usuários
  // test("should return an incorrect request if the user tries to view another user's data and is not an administrator", async () => {
  //   const result = await testInstance.execute({
  //     query: fakeQuery,
  //     userId: "IdNotExists",
  //   });
  //   expect(result).toEqual(unauthorized());
  // });
  // test("should allow admin to to view another user's account", async () => {
  //   // Simular que o usuário logado é um administrador
  //   const adminUser = { _id: "adminId", role: "admin" };
  // 
  //   const result= await testInstance.execute({
  //     query: fakeQuery,
  //     userId: fakeUserEntity?._id,
  //     userLogged: adminUser, // Simular o usuário logado como administrador
  //   });
  // 
  //   expect(result).toEqual(success(fakeUserPaginated));
  //   expect(loadUserByPage).toHaveBeenCalledWith({ 
  //     fields: fakeQueryParams,
  //     options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
  //   });
  //   expect(loadUserByPage).toHaveBeenCalledTimes(1);
  // });

  // test("should call loadUserByPage with correct params without http query", async () => {
  //   const result = await testInstance.execute({
  //     userId: fakeUserEntity?._id,
  //   });
  //   expect(result).toEqual(success(fakeUserPaginated));
  // });
  test("should throws if loadUserByPage throw", async () => {
    loadUserByPage.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("page")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("page")]));
  });
});
