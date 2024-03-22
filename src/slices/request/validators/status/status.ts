import {
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL,
  CANCELLED_STATUS_ARRAY,
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE,
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST,
} from "@/application/constants";
import { differenceInMinutes } from "@/application/helpers/dateFns";
import { RequestData } from "@/slices/request/entities";

export type StatusIsValidInput = {
    currentRequest: RequestData;
    newStatus: string;
};

export const statusIsValid = (statusIsValidInput: StatusIsValidInput): boolean => {
  const { currentRequest, newStatus } = statusIsValidInput || {};
  if (!currentRequest || !newStatus) {
    return false;
  }
  const { status, initDate: initDateAux } = currentRequest;

  const initDate = new Date(initDateAux); // Quando o agendamento foi marcado - calcular distancia em minutos
  const differenceInMinutesBetweenAppointmentDateAndNow: number = differenceInMinutes(
    new Date(),
    initDate
  );

  const appointmentWasHappened = differenceInMinutesBetweenAppointmentDateAndNow > 0;   // Saber se o agendamento já aconteceu
  
  const cannotChangeStatusBecauseOfAppointmentDate =
  (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE.includes(newStatus) && 
      appointmentWasHappened) || 
  (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST.includes(newStatus) &&
      !appointmentWasHappened);
  if (cannotChangeStatusBecauseOfAppointmentDate) {
    return false;
  }

  const validStatusArray = getValidStatusForNewStatus(newStatus);

  if  (CANCELLED_STATUS_ARRAY.includes(newStatus) &&
        validStatusArray.includes(status) &&
        differenceInMinutesBetweenAppointmentDateAndNow > ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL ){
    return false;
  } else if ( validStatusArray.includes(status) && appointmentWasHappened){
    return true;
  }
  else if (validStatusArray.includes(status)) {
    return true;
  } 

  return false;
};

export const getValidStatusForNewStatus = (newStatus: string): string[] => {
  switch (newStatus) {
  case "confirmado":
  case "cancelado_profissional":
  case "cancelado_cliente":
    return ["solicitado"];
  case "finalizado":
    return ["confirmado"];
  default:
    return [];
  }
};
// O status só pode ser: 
// 1. Confirmado, se o status atual for solicitado e a data de início for maior que a data atual
// 2. Cancelado pelo profissional, se o status atual for solicitado e a data de início for maior que a data atual e a diferença entre a data de início e a data atual for maior que 60 minutos
// 3. Cancelado pelo cliente, se o status atual for solicitado e a data de início for maior que a data atual e a diferença entre a data de início e a data atual for maior que 60 minutos
// 4. Finalizado, se o status atual for confirmado e a data de início for menor que a data atual