import MockDate from "mockdate";

import { addMinutes, subMinutes } from "@/application/helpers/dateFns";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";

import { statusIsValid } from "./status";

describe("Testing status validators", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should return false if i pass null as parameter", () => {
    expect(statusIsValid(null as any)).toBe(false);
  });
  it(
    "should return false when status === 0" +
            "and newStatus === 1, initDate < new Date() (appointment was happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(1999, 10, 10, 10).toISOString(),
            status: "solicitado",
          },
          newStatus: "confirmado",
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when status === 0" +
            "and newStatus === 1, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: "solicitado",
          },
          newStatus: "confirmado",
        })
      ).toBe(true);
    }
  );
  it(
    "should return true when status === 0" +
            "and newStatus === 2||===3, initDate > new Date() (appointment wasn`t happened) in valid period",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: "solicitado",
          },
          newStatus: "cancelado_profissional",
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when status === 0" +
            "and newStatus === 2||===3, initDate > new Date() (appointment wasn`t happened) because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: addMinutes(new Date(), 10), // Agendamento vai acontecer daqui a 10 minutos
            status: "solicitado",
          },
          newStatus: "cancelado_profissional",
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when status === 'confirmado' " +
      "and newStatus === 'finalizado' and appointmentWasHappened is true",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 30).toISOString(), // Agendamento aconteceu há 30 minutos
            status: "confirmado",
          },
          newStatus: "finalizado",
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when status === 'confirmado' " +
      "and newStatus === 'finalizado' and appointmentWasHappened because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: addMinutes(new Date(), 60), // Agendamento vai acontecer daqui a 60 minutos
            status: "confirmado",
          },
          newStatus: "finalizado",
        })
      ).toBe(false);
    }
  );
});
//  status só pode ser: 
// 1. Confirmado, se o status atual for solicitado e a data de início for maior que a data atual
// 2. Cancelado pelo profissional, se o status atual for solicitado e a data de início for maior que a data atual e a diferença entre a data de início e a data atual for maior que 60 minutos
// 3. Cancelado pelo cliente, se o status atual for solicitado e a data de início for maior que a data atual e a diferença entre a data de início e a data atual for maior que 60 minutos
// 4. Finalizado, se o status atual for confirmado e a data de início for menor que a data atual