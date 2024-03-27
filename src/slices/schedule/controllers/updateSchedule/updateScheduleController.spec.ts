import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { UpdateScheduleController } from "./updateScheduleController";

describe("UpdateScheduleController", () => {
  let testInstance: UpdateScheduleController;
  let updateSchedule: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateSchedule = jest.fn();
    updateSchedule.mockResolvedValue({
      ...fakeScheduleEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateScheduleController(
      validationQuery,
      validationBody,
      updateSchedule
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeScheduleEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeScheduleEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeScheduleEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeScheduleEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateSchedule with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeScheduleEntity,
      query: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeScheduleEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateSchedule).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeScheduleEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeScheduleEntity
    );
    expect(updateSchedule).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateSchedule throw", async () => {
    updateSchedule.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeScheduleEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeScheduleEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeScheduleEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
