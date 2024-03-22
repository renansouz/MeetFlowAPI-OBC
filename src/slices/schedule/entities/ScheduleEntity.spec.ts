import MockDate from "mockdate";

import { ScheduleEntity } from "./ScheduleEntity";

export const fakeScheduleEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeScheduleEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  appointmentsTotal: 3,
  days1: {
    monday1: true,
    sunday1: true,
    tuesday1: true,
    thursday1: true,
    friday1: true,
    wednsday1: true,
    saturday1: true,
  },
  hourEnd1: "23:59",
  hourStart1: "00:00",
};
export const fakeSchedulePaginated = {
  total: 11,
  schedules: [
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
    fakeScheduleEntity,
  ],
};

describe("Schedule", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new ScheduleEntity(fakeScheduleEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeScheduleEntity,
      _id: undefined,
      active: false,
      appointmentsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
