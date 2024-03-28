import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import {
  fakeAvailableTimesEntity as fakeAvailableTimesModelRepository,
  fakeAvailableTimesModel,
  fakeAvailableTimesModel2,
} from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import {
  LoadAvailableTimes,
  loadAvailableTimes,
} from "@/slices/appointment/useCases/loadAvailableTimes";
import {
  validateAvailableTimes,
  ValidateAvailableTimesSchema,
} from "@/slices/appointment/useCases/validateAvailableTimes";
import { fakeScheduleEntity } from "@/slices/schedule/entities/ScheduleEntity.spec";
import { LoadScheduleRepository } from "@/slices/schedule/repositories";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { LoadServiceRepository } from "@/slices/service/repositories";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { LoadUserRepository } from "@/slices/user/repositories";

describe("ValidateAvailableTimes", () => {
  let testInstance: ValidateAvailableTimesSchema;
  let testLoadAvailableTimes: LoadAvailableTimes;
  let loadAvailableTimesRepository: MockProxy<LoadAvailableTimesRepository>;
  let serviceRepository: MockProxy<LoadServiceRepository>;
  let userRepository: MockProxy<LoadUserRepository>;
  let scheduleRepository: MockProxy<LoadScheduleRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadAvailableTimesRepository = mock();
    serviceRepository = mock();
    userRepository = mock();
    scheduleRepository = mock();
    userRepository.loadUser.mockResolvedValue(fakeUserEntity);
    scheduleRepository.loadSchedule.mockResolvedValue(fakeScheduleEntity);
    serviceRepository.loadService.mockResolvedValue(fakeServiceEntity);
    loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(
      fakeAvailableTimesModelRepository
    );
  });
  beforeEach(() => {
    testLoadAvailableTimes = loadAvailableTimes(
      loadAvailableTimesRepository,
      serviceRepository,
      userRepository,
      scheduleRepository
    );
    testInstance = validateAvailableTimes(testLoadAvailableTimes);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should return true if i have available times", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => fakeAvailableTimesModel)
    );
    const appointment = await testInstance({
      professionalId: "fakeUserId",
      date: new Date(2021, 9, 14, 3, 0).toISOString(),
      serviceId: "fakeServiceId",
      scheduleId: "fakeScheduleId",
      initDate: "2021-10-14T11:00:00.000Z",
      endDate: "2021-10-14T11:30:00.000Z",
    });
    expect(appointment).toBeTruthy();
  });
  it("should return false if i pass null as param", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => fakeAvailableTimesModel)
    );
    const appointment = await testInstance(null as any);
    expect(appointment).toBe(false);
  });
  it("should return false if pass endDate <= initDate", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => fakeAvailableTimesModel)
    );
    const appointment = await testInstance({
      professionalId: "fakeUserId",
      date: new Date(2021, 9, 14, 3, 0).toISOString(),
      serviceId: "fakeServiceId",
      scheduleId: "fakeScheduleId",
      initDate: "2021-10-14T14:00:00.000Z",
      endDate: "2021-10-14T11:30:00.000Z",
    });
    expect(appointment).toBe(false);
  });
  it("should return false if loadAvailableTimes returns null", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => null)
    );
    const appointment = await testInstance({
      professionalId: "fakeUserId",
      date: new Date(2021, 9, 14, 3, 0).toISOString(),
      serviceId: "fakeServiceId",
      scheduleId: "fakeScheduleId",
      initDate: "2021-10-14T11:00:00.000Z",
      endDate: "2021-10-14T11:30:00.000Z",
    });
    expect(appointment).toBe(false);
  });
  it("should return true if i have time available", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => fakeAvailableTimesModel2)
    );
    const appointment = await testInstance({
      professionalId: "fakeUserId",
      date: new Date(2021, 9, 14, 3, 0).toISOString(),
      serviceId: "fakeServiceId",
      scheduleId: "fakeScheduleId",
      initDate: "2021-10-14T11:00:00.000Z",
      endDate: "2021-10-14T11:30:00.000Z",
    });
    expect(appointment).toBe(true);
  });
  it("should return false if i haven`t time available", async () => {
    testInstance = validateAvailableTimes(
      jest.fn().mockImplementation(() => fakeAvailableTimesModel)
    );
    const appointment = await testInstance({
      professionalId: "fakeUserId",
      date: new Date(2021, 9, 14, 3, 0).toISOString(),
      serviceId: "fakeServiceId",
      scheduleId: "fakeScheduleId",
      initDate: "2021-10-14T04:00:00.000Z",
      endDate: "2021-10-14T04:30:00.000Z",
    });
    expect(appointment).toBe(false);
  });
});
