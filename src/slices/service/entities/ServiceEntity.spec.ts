import MockDate from "mockdate";

import { ServiceEntity } from "./ServiceEntity";

export const fakeServiceEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeServiceEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  duration: 60,
  categoryId: "any_category_id",
  description: "desc",
  appointmentsTotal: 1,
};
export const fakeServicePaginated = {
  total: 11,
  services: [
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
    fakeServiceEntity,
  ],
};

describe("Service", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new ServiceEntity(fakeServiceEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeServiceEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      appointmentsTotal: 0,
    });
  });
});
