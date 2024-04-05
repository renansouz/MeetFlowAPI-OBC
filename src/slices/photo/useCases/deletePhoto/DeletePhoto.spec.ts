import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Delete } from "@/application/infra";
import { Query } from "@/application/types";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { DeletePhotoRepository } from "@/slices/photo/repositories/contracts";

import { deletePhoto } from "./DeletePhoto";

describe("deletePhoto", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deletePhotoRepository: MockProxy<DeletePhotoRepository>;
  let deleted: MockProxy<Delete>;

  beforeAll(async () => {
    MockDate.set(new Date());
    deletePhotoRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deletePhotoRepository.deletePhoto.mockResolvedValue(fakePhotoEntity);
    deleted = mock();
    deleted.delete.mockResolvedValue(true);
  });
  beforeEach(() => {
    testInstance = deletePhoto(deletePhotoRepository, deleted);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deletePhoto of DeletePhotoRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deletePhotoRepository.deletePhoto).toHaveBeenCalledWith(fakeQuery);
    expect(deletePhotoRepository.deletePhoto).toHaveBeenCalledTimes(1);
  });
  it("should return a new photo deleted when deletePhotoRepository delete it", async () => {
    const photo = await testInstance(fakeQuery);
    expect(photo).toEqual(fakePhotoEntity);
  });
  it("should return null a new photo deleted when deletePhotoRepository delete it", async () => {
    deletePhotoRepository.deletePhoto.mockResolvedValue(null);
    const photo = await testInstance(fakePhotoEntity);
    expect(photo).toBeNull();
  });
  it("should rethrow if deletePhoto of DeletePhotoRepository throws", async () => {
    deletePhotoRepository.deletePhoto.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});