import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Query } from "@/application/types";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { UpdateScheduleRepository } from "@/slices/schedule/repositories";

import { UpdateSchedule, updateSchedule } from "./UpdateSchedule";

describe("UpdateSchedule", () => {
  let fakeQuery: Query;
  let testInstance: UpdateSchedule;
  let updateScheduleRepository: MockProxy<UpdateScheduleRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateScheduleRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateScheduleRepository.updateSchedule.mockResolvedValue(fakeScheduleEntity);
  });
  beforeEach(() => {
    testInstance = updateSchedule(updateScheduleRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateSchedule of UpdateScheduleRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeScheduleEntity);
    expect(updateScheduleRepository.updateSchedule).toHaveBeenCalledWith(fakeQuery, {
      hourStart1: fakeScheduleEntity?.hourStart1,
      hourEnd1: fakeScheduleEntity?.hourEnd1,
      days1: fakeScheduleEntity?.days1,
      name: fakeScheduleEntity?.name,
    } as any);
    expect(updateScheduleRepository.updateSchedule).toHaveBeenCalledTimes(1);
  });
  it("should return a schedule updateed when updateScheduleRepository insert it", async () => {
    const schedule = await testInstance(fakeQuery, fakeScheduleEntity);
    expect(schedule).toEqual(fakeScheduleEntity);
  });
  it("should return null a new schedule updateed when updateScheduleRepository return it", async () => {
    updateScheduleRepository.updateSchedule.mockResolvedValue(null);
    const schedule = await testInstance(fakeQuery, fakeScheduleEntity);
    expect(schedule).toBeNull();
  });
  it("should rethrow if updateSchedule of UpdateScheduleRepository throws", async () => {
    updateScheduleRepository.updateSchedule.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeScheduleEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});