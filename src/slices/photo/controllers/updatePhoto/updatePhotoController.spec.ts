import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { UpdatePhotoController } from "./updatePhotoController";

describe("UpdatePhotoController", () => {
  let testInstance: UpdatePhotoController;
  let updatePhoto: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updatePhoto = jest.fn();
    updatePhoto.mockResolvedValue({
      ...fakePhotoEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdatePhotoController(
      validationQuery,
      validationBody,
      updatePhoto
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakePhotoEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakePhotoEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakePhotoEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakePhotoEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updatePhoto with correct params", async () => {
    const result = await testInstance.execute({
      body: fakePhotoEntity,
      query: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakePhotoEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updatePhoto).toHaveBeenCalledWith(
      {
        fields: {
          ...fakePhotoEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakePhotoEntity
    );
    expect(updatePhoto).toHaveBeenCalledTimes(1);
  });
  test("should throws if updatePhoto throw", async () => {
    updatePhoto.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakePhotoEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakePhotoEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
