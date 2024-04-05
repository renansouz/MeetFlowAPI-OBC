import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { Delete, Uploader } from "@/application/infra";
import { PhotoEntity } from "@/slices/photo/entities";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { AddPhotoRepository, DeletePhotoRepository } from "@/slices/photo/repositories/contracts";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { LoadUserRepository } from "@/slices/user/repositories";

import { addPhoto } from "./AddPhoto";

describe("addPhoto", () => {
  let testInstance: any;
  let addPhotoRepository: MockProxy<AddPhotoRepository & DeletePhotoRepository>;  
  let loadUserRepository: MockProxy<LoadUserRepository>;
  let uploader: MockProxy<Uploader & Delete>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addPhotoRepository = mock();
    addPhotoRepository.addPhoto.mockResolvedValue(fakePhotoEntity);
    addPhotoRepository.deletePhoto.mockResolvedValue(null);
    loadUserRepository = mock();
    loadUserRepository.loadUser.mockResolvedValue(fakeUserEntity);
    uploader = mock();
    uploader.upload.mockResolvedValue({ url: "fakeUrl" });
    uploader.delete.mockResolvedValue(true);
  });
  beforeEach(() => {
    testInstance = addPhoto(addPhotoRepository, loadUserRepository, uploader ,uploader,);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addPhoto of AddPhotoRepository with correct values", async () => {
    await testInstance(fakePhotoEntity);
    expect(addPhotoRepository.addPhoto).toHaveBeenCalledWith(
      new PhotoEntity(fakePhotoEntity)
    );
    expect(addPhotoRepository.addPhoto).toHaveBeenCalledTimes(1);
  });
  it("should return a new photo created when addPhotoRepository insert it", async () => {
    const photo = await testInstance(fakePhotoEntity);
    expect(photo).toEqual(fakePhotoEntity);
  });
  it("should return null a new photo created when addPhotoRepository insert it", async () => {
    addPhotoRepository.addPhoto.mockResolvedValue(null);
    const photo = await testInstance(fakePhotoEntity);
    expect(photo).toBeNull();
  });
  it("should rethrow if addPhoto of AddPhotoRepository throws", async () => {
    addPhotoRepository.addPhoto.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakePhotoEntity)).rejects.toThrowError("any_error");
  });
});