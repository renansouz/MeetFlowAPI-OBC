import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { DeleteRequestController } from "./deleteRequestController";

describe("DeleteRequestController", () => {
  let testInstance: DeleteRequestController;
  let deleteRequest: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteRequest = jest.fn();
    deleteRequest.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeRequestEntity._id };
    testInstance = new DeleteRequestController(validation, deleteRequest);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteRequest with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(success(true));
    expect(deleteRequest).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deleteRequest).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteRequest throw", async () => {
    deleteRequest.mockRejectedValueOnce(new Error("error"));
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
