import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { DeleteClientController } from "./deleteClientController";

describe("DeleteClientController", () => {
  let testInstance: DeleteClientController;
  let deleteClient: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteClient = jest.fn();
    deleteClient.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeClientEntity._id };
    testInstance = new DeleteClientController(validation, deleteClient);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteClient with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(success(true));
    expect(deleteClient).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deleteClient).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteClient throw", async () => {
    deleteClient.mockRejectedValueOnce(new Error("error"));
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
