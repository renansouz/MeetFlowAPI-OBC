import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { ScheduleEntity } from "@/slices/schedule/entities";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { AddScheduleRepository } from "@/slices/schedule/repositories/contracts";

import { addSchedule } from "./AddSchedule";

describe("addSchedule", () => {
  let testInstance: any;
  let addScheduleRepository: MockProxy<AddScheduleRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addScheduleRepository = mock();
    addScheduleRepository.addSchedule.mockResolvedValue(fakeScheduleEntity);
  });
  beforeEach(() => {
    testInstance = addSchedule(addScheduleRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addSchedule of AddScheduleRepository with correct values", async () => {
    await testInstance(fakeScheduleEntity);
    expect(addScheduleRepository.addSchedule).toHaveBeenCalledWith(
      new ScheduleEntity(fakeScheduleEntity)
    );
    expect(addScheduleRepository.addSchedule).toHaveBeenCalledTimes(1);
  });
  it("should return a new schedule created when addScheduleRepository insert it", async () => {
    const schedule = await testInstance(fakeScheduleEntity);
    expect(schedule).toEqual(fakeScheduleEntity);
  });
  it("should return null a new schedule created when addScheduleRepository insert it", async () => {
    addScheduleRepository.addSchedule.mockResolvedValue(null);
    const schedule = await testInstance(fakeScheduleEntity);
    expect(schedule).toBeNull();
  });
  it("should rethrow if addSchedule of AddScheduleRepository throws", async () => {
    addScheduleRepository.addSchedule.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeScheduleEntity)).rejects.toThrowError("any_error");
  });
});
