import MockDate from "mockdate";

import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";

import { RequestEntity } from "./RequestEntity";


export const fakeRequestEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeRequestEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  haveRecurrence: true,
  message: "Olá fulano, gostaria de marcar horário as 10h da manhã",
  serviceId: "fakeServiceId",
  scheduleId: "fakeUserId",
  clientId: "fakeUserId",
  professionalId: "fakeUser2Id",
  status: "finalizado",
  duration: 30,
  initDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  cancelledAt: null,
  order: fakeOrderEntity,
  recurrence: fakeRecurrenceEntity,
  updatedById: "61c1f9d0e399d2917bdff44e",
  updatedByRole: "admin",
};
export const fakeRequestPaginated = {
  total: 11,
  requests: [
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
    fakeRequestEntity,
  ],
};

describe("Request", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new RequestEntity(fakeRequestEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeRequestEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "solicitado",
      updatedById: null,
      updatedByRole: null,
    });
  });
});
