import { mock, MockProxy } from "jest-mock-extended";

import { HttpRequest, serverError,success } from "@/application/helpers/http";
import { Controller,LogRepository } from "@/application/infra/contracts";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LogController } from "./logController";

describe("logController", () => {
  let testInstance: LogController;
  let logRepository: MockProxy<LogRepository>;
  let controller: MockProxy<Controller>;
  let fakeRequest: HttpRequest;
  beforeAll(() => {
    logRepository = mock();
    controller = mock();
    controller.execute.mockResolvedValue(success(fakeUserEntity));
    controller.handle.mockResolvedValue(success(fakeUserEntity));
    logRepository.logError.mockResolvedValue();
    fakeRequest = { body: fakeUserEntity };
  });
  beforeEach(() => {
    testInstance = new LogController("user", controller, logRepository);
  });
  test("should call controller execute with correct params", async () => {
    await testInstance.handle(fakeRequest);
    expect(controller.execute).toHaveBeenCalledWith(fakeRequest);
    expect(controller.execute).toHaveBeenCalledTimes(1);
  });
  test("should call logRepository if i got server error", async () => {
    controller.execute.mockResolvedValueOnce(serverError(new Error("any_error")));
    await testInstance.handle(fakeRequest);
    expect(logRepository.logError).toHaveBeenCalledWith(
      "user",
      serverError(new Error("any_error")).data
    );
    expect(logRepository.logError).toHaveBeenCalledTimes(1);
  });
});