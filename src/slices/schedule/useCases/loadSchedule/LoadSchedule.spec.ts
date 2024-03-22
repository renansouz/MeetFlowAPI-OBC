import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Query } from "@/application/types";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { LoadScheduleRepository } from "@/slices/schedule/repositories";

import { LoadSchedule, loadSchedule } from "./LoadSchedule";

describe("LoadSchedule", () => {
  let fakeQuery: Query;
  let testInstance: LoadSchedule;
  let loadScheduleRepository: MockProxy<LoadScheduleRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadScheduleRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadScheduleRepository.loadSchedule.mockResolvedValue(fakeScheduleEntity);
  });
  beforeEach(() => {
    testInstance = loadSchedule(loadScheduleRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadSchedule of LoadScheduleRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadScheduleRepository.loadSchedule).toHaveBeenCalledWith(fakeQuery);
    expect(loadScheduleRepository.loadSchedule).toHaveBeenCalledTimes(1);
  });
  it("should return a schedule loaded when loadScheduleRepository insert it", async () => {
    const schedule = await testInstance(fakeQuery);
    expect(schedule).toEqual(fakeScheduleEntity);
  });
  it("should return null a new schedule loaded when loadScheduleRepository return it", async () => {
    loadScheduleRepository.loadSchedule.mockResolvedValue(null);
    const schedule = await testInstance(fakeQuery);
    expect(schedule).toBeNull();
  });
  it("should rethrow if loadSchedule of LoadScheduleRepository throws", async () => {
    loadScheduleRepository.loadSchedule.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
