import { subHours } from "date-fns";
import MockDate from "mockdate";
import { ObjectId } from "mongodb";

import {
  mapQueryParamsToQueryMongo,
} from "./mapQueryParamsToQueryMongo";

describe("mapQueryParamsToQueryMongo", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });
  test("mapQueryParamsToQueryMongo with array of string ids", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      price: "5",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      price: { $eq: Number("5") },
      userId: new ObjectId(fakeId3),
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with dates will generate date in future", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      isFutureinitDate: "1",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $gte: subHours(new Date(), 4).toISOString() },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with dates will generate date in past", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      isPastinitDate: "1",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $lte: subHours(new Date(), 4).toISOString() },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with 2 dates will generate query between dates", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const fakeDate = new Date().toISOString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      initDate: fakeDate,
      endDate: fakeDate,
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $lte: fakeDate, $gte: fakeDate },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with string will generate regex when necessary", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      nametextregex: "lalal",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      name: { $regex: "lalal", $options: "i" },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with string will generate query when necessary", () => {
    const fakeId1 = new ObjectId().toString();
    const fakeId2 = new ObjectId().toString();
    const fakeId3 = new ObjectId().toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      nametext: "lalal",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      $text: { $search: "lalal", $caseSensitive: false, $diacriticSensitive: false },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo", () => {
    const objectMapped = mapQueryParamsToQueryMongo(null as any);
    expect(objectMapped).toBeUndefined();
  });
});