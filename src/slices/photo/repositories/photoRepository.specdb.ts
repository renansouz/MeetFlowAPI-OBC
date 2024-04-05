import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import {
  fakePhotoEntity,
} from "@/slices/photo/entities/PhotoEntity.spec";

import { PhotoRepository } from "./photoRepository";

describe("Photo Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: PhotoRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { title: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakePhotoEntity);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new PhotoRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addPhoto with correct values", async () => {
    await testInstance.addPhoto(fakePhotoEntity);
    expect(repository.add).toHaveBeenCalledWith(fakePhotoEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new photo created when addPhoto insert it", async () => {
    const result = await testInstance.addPhoto(fakePhotoEntity);
    expect(result).toEqual(fakePhotoEntity);
  });
  test("should return null when addPhoto returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addPhoto(fakePhotoEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addPhoto throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addPhoto(fakePhotoEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deletePhoto with correct values", async () => {
    await testInstance.deletePhoto(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new photo created when deletePhoto insert it", async () => {
    const result = await testInstance.deletePhoto(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deletePhoto returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deletePhoto(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deletePhoto throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deletePhoto(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});