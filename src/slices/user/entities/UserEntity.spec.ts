import MockDate from "mockdate";

import { UserEntity } from "./UserEntity";

export const fakeUserEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeUserEntity",
    email: "string",
    password: "string",
    appointmentsTotal: 1,
    photoUrl: "string",
    photoId: "string",
    active: true,
};
export const fakeUserPaginated = {
  total: 11,
  users: [
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
  ],
};

describe("User", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new UserEntity(fakeUserEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeUserEntity,
      _id: undefined,
      active: false,
      appointmentsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
