import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LoadScheduleController } from "./loadScheduleController";

describe("LoadScheduleController", () => {
  let testInstance: LoadScheduleController;
  let loadSchedule: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadSchedule = jest.fn();
    loadSchedule.mockResolvedValue({
      ...fakeScheduleEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeScheduleEntity._id };
    testInstance = new LoadScheduleController(validation, loadSchedule);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadSchedule with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeScheduleEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadSchedule).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadSchedule).toHaveBeenCalledTimes(1);
  });
  test("should throws if loadSchedule throw", async () => {
    loadSchedule.mockRejectedValueOnce(new Error("error"));
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
