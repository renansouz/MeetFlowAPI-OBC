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
/*
const statusTypes = [
    "status 0 é solicitado",
    "status 1 é confirmado",
    "status 2 é cancelado pelo owner",
    "status 3 é cancelado pelo client",
    "status 4 é reagendamento pendente devido a conflito de agenda",
    "status 5 é reagendamento solicitado pelo owner",
    "status 6 é reagendamento solicitado pelo client",
    "status 7 é reagendamento confirmado ou pelo owner ou pelo client",
    "status 8 é reagendamento negado ou pelo owner ou pelo client",
    "status 9 é quando o cliente avalia",
    "status 10 é quando o owner efetiva o pedido, nesse momento é criado um registro em order",
    "status 11 é quando o cliente avalia pedido já efetivado",
];
const rules = [
    "status só pode ser 0 se for passado no addRequest, no update não pode",
    //  "status só pode ser 1 se status anterior for 0 e se o agendamento tiver data de início no futuro",
    "status só pode ser 2 se status anterior for 0 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
    "status só pode ser 3 se status anterior for 0 e se o agendamento tiver data de início no futuro e esse futuro for maior minimumTimeForReSchedule do owner",
    // "status só pode ser 4 se status anterior for 0",
    "status só pode ser 5 se status anterior for 0,4,3",
    "status só pode ser 5 se status anterior for 1,7,2 e a data de inicio for maior que ao menos 50min da data presente",
    "status só pode ser 6 se status anterior for 0, 4, ou 2",
    "status só pode ser 6 se status anterior for 1,7,3 e a data de inicio for maior que ao menos minimumTimeForReSchedule do owner contando a data presente",
    "status só pode ser 7 se status anterior for 5 ou 6 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
    "status só pode ser 8 se status anterior for 5 ou 6 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
    "status só pode ser 9 se status anterior for 1, 7 e se o agendamento tiver data de início no passado e esse passado tiver distancia minima de 3 dias",
    "status só pode ser 10 se status anterior for 1, 7 ou 9 e se o agendamento tiver data de início no passado",
    "status só pode ser 11 se status anterior for 10 e se o agendamento tiver data de início no passado e esse passado tiver distancia minima de 3 dias",
];
*/