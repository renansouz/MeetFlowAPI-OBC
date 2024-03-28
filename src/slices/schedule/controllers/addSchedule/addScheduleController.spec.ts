import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { AddScheduleController } from "./addScheduleController";

describe("AddScheduleController", () => {
  let testInstance: AddScheduleController;
  let addSchedule: jest.Mock;
  let loadSchedule: jest.Mock;
  let updateUser: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addSchedule = jest.fn();
    addSchedule.mockResolvedValue({
      ...fakeScheduleEntity,
      createdById: fakeUserEntity?._id,
    });
    updateUser = jest.fn();
    updateUser.mockResolvedValue({
      ...fakeUserEntity,
      createdById: fakeScheduleEntity._id,
    });
    loadSchedule = jest.fn();
    loadSchedule.mockResolvedValue(null);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddScheduleController(validation, addSchedule, loadSchedule, updateUser);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeScheduleEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeScheduleEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addSchedule with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeScheduleEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addSchedule).toHaveBeenCalledWith({
      ...fakeScheduleEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addSchedule).toHaveBeenCalledTimes(1);
  });
  test("should throws if addSchedule throw", async () => {
    addSchedule.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should call loadSchedule with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeScheduleEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadSchedule).toHaveBeenCalledWith({
      fields: { createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(loadSchedule).toHaveBeenCalledTimes(1);
  });
  test("should return bad request if schedule exists", async () => {
    loadSchedule.mockResolvedValueOnce(fakeScheduleEntity);
    const result = await testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      badRequest([{ field: "createdById", message: "Schedule already exists" }])
    );
  });
  test("should throws if loadSchedule throw", async () => {
    loadSchedule.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeScheduleEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
