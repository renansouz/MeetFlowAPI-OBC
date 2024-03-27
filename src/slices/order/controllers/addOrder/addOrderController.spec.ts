import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, success, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { AddOrderController } from "./addOrderController";

describe("AddOrderController", () => {
  let testInstance: AddOrderController;
  let addOrder: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addOrder = jest.fn();
    addOrder.mockResolvedValue({
      ...fakeOrderEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddOrderController(validation, addOrder);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeOrderEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeOrderEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addOrder with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOrderEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      success({
        ...fakeOrderEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addOrder).toHaveBeenCalledWith({
      ...fakeOrderEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addOrder).toHaveBeenCalledTimes(1);
  });
  test("should throws if addOrder throw", async () => {
    addOrder.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOrderEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeOrderEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
