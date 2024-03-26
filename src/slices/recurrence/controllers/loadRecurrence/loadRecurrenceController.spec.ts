import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LoadRecurrenceController } from "./loadRecurrenceController";

describe("LoadRecurrenceController", () => {
  let testInstance: LoadRecurrenceController;
  let loadRecurrence: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadRecurrence = jest.fn();
    loadRecurrence.mockResolvedValue({
      ...fakeRecurrenceEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeRecurrenceEntity._id };
    testInstance = new LoadRecurrenceController(validation, loadRecurrence);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadRecurrence with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeRecurrenceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadRecurrence).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadRecurrence).toHaveBeenCalledTimes(1);
  });
  test("should throws if loadRecurrence throw", async () => {
    loadRecurrence.mockRejectedValueOnce(new Error("error"));
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
