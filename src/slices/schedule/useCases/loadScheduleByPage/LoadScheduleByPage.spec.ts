import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Query } from "@/application/types";
import { fakeSchedulePaginated } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { LoadScheduleByPageRepository } from "@/slices/schedule/repositories";

import { LoadScheduleByPage, loadScheduleByPage } from "./LoadScheduleByPage";

describe("LoadScheduleByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadScheduleByPage;
  let loadScheduleByPageRepository: MockProxy<LoadScheduleByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadScheduleByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadScheduleByPageRepository.loadScheduleByPage.mockResolvedValue(fakeSchedulePaginated);
  });
  beforeEach(() => {
    testInstance = loadScheduleByPage(loadScheduleByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadScheduleByPage of LoadScheduleByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadScheduleByPageRepository.loadScheduleByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadScheduleByPageRepository.loadScheduleByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a schedule loaded when loadScheduleByPageRepository insert it", async () => {
    const schedule = await testInstance(fakeQuery);
    expect(schedule).toEqual(fakeSchedulePaginated);
  });
  it("should return null a new schedule loaded when loadScheduleByPageRepository return it", async () => {
    loadScheduleByPageRepository.loadScheduleByPage.mockResolvedValue(null);
    const schedule = await testInstance(fakeQuery);
    expect(schedule).toBeNull();
  });
  it("should rethrow if loadScheduleByPage of LoadScheduleByPageRepository throws", async () => {
    loadScheduleByPageRepository.loadScheduleByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
