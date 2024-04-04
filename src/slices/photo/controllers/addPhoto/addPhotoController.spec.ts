import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { badRequest, success, Validation } from "@/application/helpers";
import { Uploader } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { AddPhotoController } from "./addPhotoController";

describe("AddPhotoController", () => {
  let testInstance: AddPhotoController;
  let addPhoto: jest.Mock;
  let updateUser: jest.Mock;
  let uploader: MockProxy<Uploader>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addPhoto = jest.fn();
    addPhoto.mockResolvedValue({
      ...fakePhotoEntity,
      createdById: fakeUserEntity?._id,
    });
    updateUser = jest.fn();
    updateUser.mockResolvedValue(fakeUserEntity);
    uploader = mock();
    uploader.upload.mockResolvedValue({ url: "fakeUrl" });
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddPhotoController( addPhoto, updateUser, uploader);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call addPhoto with correct params", async () => {
    const result = await testInstance.execute({
      body: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakePhotoEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addPhoto).toHaveBeenCalledWith({
      ...fakePhotoEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addPhoto).toHaveBeenCalledTimes(1);
  });
  test("should throws if addPhoto throw", async () => {
    addPhoto.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
});
