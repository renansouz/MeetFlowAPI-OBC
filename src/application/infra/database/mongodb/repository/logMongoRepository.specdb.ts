import MockDate from "mockdate";
import { Collection } from "mongodb";

import { MongoHelper } from "@/application/infra";

import { LogMongoRepository } from "./logMongoRepository";
describe("LogMongoRepository", () => {
  let testInstance: LogMongoRepository;
  let errorCollection: Collection;
  beforeAll(async () => {
    MockDate.set(new Date());
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });
  afterAll(async () => {
    MockDate.reset();
    await errorCollection.deleteMany({});
    await MongoHelper.disconnect();
  });
  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection("errors");
    testInstance = new LogMongoRepository();
  });
  test("should call logError and generate an error in error collection", async () => {
    await testInstance.logError("any_domain", "any_stack");
    const errors = await errorCollection.find({}).toArray();
    expect(errors.length).toBe(1);
  });
});