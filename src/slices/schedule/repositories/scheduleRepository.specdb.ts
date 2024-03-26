import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import {
  fakeScheduleEntity,
  fakeSchedulePaginated,
} from "@/slices/schedule/entities/ScheduleEntity.spec";

import { ScheduleRepository } from "./scheduleRepository";

describe("Schedule Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: ScheduleRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeScheduleEntity);
    repository.getOne.mockResolvedValue(fakeScheduleEntity);
    repository.update.mockResolvedValue(fakeScheduleEntity);
    repository.getPaginate.mockResolvedValue(fakeSchedulePaginated?.schedules);
    repository.getCount.mockResolvedValue(fakeSchedulePaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new ScheduleRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addSchedule with correct values", async () => {
    await testInstance.addSchedule(fakeScheduleEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeScheduleEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new schedule created when addSchedule insert it", async () => {
    const result = await testInstance.addSchedule(fakeScheduleEntity);
    expect(result).toEqual(fakeScheduleEntity);
  });
  test("should return null when addSchedule returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addSchedule(fakeScheduleEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addSchedule throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addSchedule(fakeScheduleEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateSchedule throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateSchedule(fakeQuery, fakeScheduleEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateSchedule with correct values", async () => {
    await testInstance.updateSchedule(fakeQuery, fakeScheduleEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeScheduleEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a schedule updated when updateSchedule update it", async () => {
    const result = await testInstance.updateSchedule(fakeQuery, fakeScheduleEntity);
    expect(result).toEqual(fakeScheduleEntity);
  });
  test("should return a schedule updated when updateSchedule update it when i pass null", async () => {
    const result = await testInstance.updateSchedule(null as any, fakeScheduleEntity);
    expect(result).toEqual(fakeScheduleEntity);
  });
  test("should return null when updateSchedule returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateSchedule(fakeQuery, fakeScheduleEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateSchedule throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateSchedule(fakeQuery, fakeScheduleEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteSchedule with correct values", async () => {
    await testInstance.deleteSchedule(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new schedule created when deleteSchedule insert it", async () => {
    const result = await testInstance.deleteSchedule(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteSchedule returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteSchedule(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteSchedule throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteSchedule(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadSchedule with correct values", async () => {
    await testInstance.loadSchedule(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeQuery?.options
    );
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a schedule when loadSchedule loaded it", async () => {
    const result = await testInstance.loadSchedule(fakeQuery);
    expect(result).toEqual(fakeScheduleEntity);
  });
  test("should return null when loadSchedule returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadSchedule(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadSchedule returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadSchedule(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadSchedule throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadSchedule(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadScheduleByPage with correct values", async () => {
    await testInstance.loadScheduleByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadScheduleByPage with correct values", async () => {
    await testInstance.loadScheduleByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a scheduleByPage when loadScheduleByPage loaded it", async () => {
    const result = await testInstance.loadScheduleByPage(fakeQuery);
    expect(result).toEqual(fakeSchedulePaginated);
  });
  test("should return null when loadScheduleByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadScheduleByPage(fakeQuery);
    expect(result).toEqual({ schedules: null, total: 0 });
  });
  test("should return null when loadScheduleByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadScheduleByPage(null as any);
    expect(result).toEqual({ schedules: null, total: 0 });
  });
  test("should rethrow if load of loadScheduleByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadScheduleByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});