import {
  add as addDateFns,
  addDays as addDaysDateFns,
  addHours as addHoursDateFns,
  addMinutes as addMinutesDateFns,
  areIntervalsOverlapping as areIntervalsOverlappingDateFns,
  differenceInDays as differenceInDaysDateFns,
  differenceInMinutes as differenceInMinutesDateFns,
  eachHourOfInterval as eachHourOfIntervalDateFns,
  eachMinuteOfInterval as eachMinuteDateFns,
  endOfDay as endOfDayDateFns,
  formatISO as formatISODateFns,
  getDay as getDayDateFns,
  intervalToDuration as intervalToDurationDateFns,
  isAfter as isAfterDateFns,
  isBefore as isBeforeDateFns,
  isPast as isPastDateFns,
  isToday as isTodayDateFns,
  parseISO as parseISODateFns,
  setHours as setHoursDateFns,
  setMilliseconds as setMiliDateFns,
  setMinutes as setMinutesDateFns,
  setSeconds as setSecondsDateFns,
  startOfDay as startOfDayDateFns,
  subDays as subDaysDateFns,
  subMinutes as subMinutesDateFns,
  toDate as toDateDateFns,
} from "date-fns";
import { utcToZonedTime as utcToZonedTimeDateFns } from "date-fns-tz";

type Options = {
    step?: number;
};

type Duration = {
    year?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};
export const addDays = (date: number | Date, amount: number): string => {
  //adicionar dia - amount é a quantidade de dias que deseja adicionar
  return addDaysDateFns(date, amount)?.toISOString?.();
};
export const addMinutes = (date: number | Date, amount: number): string => {
  //adicionar minutos
  return addMinutesDateFns(date, amount)?.toISOString?.();
};
export const addHours = (date: number | Date, amount: number): string => {
  //adicionar horas
  return addHoursDateFns(date, amount)?.toISOString?.();
};
export const isPast = (date: number | Date): boolean => {
  //Verifica se a data é passado
  return isPastDateFns(date);
};

export const startOfDay = (date: number | Date): Date => startOfDayDateFns(date);
export const endOfDay = (date: number | Date): Date => endOfDayDateFns(date);

export const isBeforeToday = (date: number | Date): boolean => {
  //Verifica se é antes de hoje
  return isBeforeDateFns(date, startOfDayDateFns(new Date()));
};

export const formatISO = (date: number | Date): string => formatISODateFns(date); //Converte a data para formato string
export const parseISO = (date: string): Date => parseISODateFns(date); //Converte o string para o formato data

export const intervalDuration = (start: number | Date, end: number | Date): Duration => {
  //Pega intervalo de duração entre uma data inicio e uma data fim.
  return intervalToDurationDateFns({ start, end });
};
export const addDuration = (duration: Duration, date: number | Date): Date => {
  return addDateFns(date, duration);
};

// Vai ver se intervalo sobrescreve o outro
export const intervalsOverlapping = (
  started1: any,
  ended1: any,
  started2: any,
  ended2: any
): boolean => {
  const start1Aux: Date = started1?.getMonth ? started1 : parseISODateFns(started1);
  const start2Aux: Date = started2?.getMonth ? started2 : parseISODateFns(started2);
  const end1Aux: Date = ended1?.getMonth ? ended1 : parseISODateFns(ended1);
  const end2Aux: Date = ended2?.getMonth ? ended2 : parseISODateFns(ended2);
  if (
    start2Aux.getTime() > start1Aux.getTime() ||
        start1Aux.getTime() > end1Aux.getTime() ||
        start2Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() < start2Aux.getTime()
  ) {
    return false;
  }
  return areIntervalsOverlappingDateFns(
    { start: start1Aux, end: end1Aux },
    { start: start2Aux, end: end2Aux }
  );
};

export const eachHourInterval = (
  // Cada horário disponível entre dia inicio e fim com o tempo do step(options) hora em hora
  start: number | Date,
  end: number | Date,
  options: Options
): Date[] => {
  return eachHourOfIntervalDateFns({ start, end }, options);
};
/* export const eachMinuteOfInterval = (dirtyInterval: any, options: Options): Date[] => {
  const interval = dirtyInterval;
  const startDate = toDateDateFns(interval.start);
  const endDate = toDateDateFns(interval.end);
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  if (startTime > endTime) {
    throw new Error("Start date is after end date");
  }
  const dates: Date[] = [];
  const step = Number(options?.step);
  if (step < 1 || isNaN(step)) {
    throw new Error("Step must be a number greater than 0");
  }
  let currentDate = startDate;
  let dateWithMinutes = currentDate;
  dates.push(toDateDateFns(currentDate));
  while (currentDate.getTime() <= endTime) {
    let floorStep = 60;
    let currentStep = 1;
    if (step > 60 && step <= 120) {
      floorStep = 120;
    } else if (step > 120 && step <= 240) {
      floorStep = 240;
    } else if (step > 240 && step <= 360) {
      floorStep = 360;
    } else if (step > 360 && step <= 480) {
      floorStep = 480;
    }
    const stepDivided = Math.floor(floorStep / step);
    while (currentStep <= stepDivided) {
      dateWithMinutes = addMinutesDateFns(dateWithMinutes, step);
      dateWithMinutes.getTime() <= endTime &&
                dates.push(toDateDateFns(dateWithMinutes));
      currentStep += 1;
    }
    currentDate = addMinutesDateFns(currentDate, step);
  }
  return dates;
};
*/

export const eachMinuteOfInterval = (setInterval: any, options: Options): Date[] => {
  const interval = setInterval;
  const startDate = toDateDateFns(interval.start);
  const endDate = toDateDateFns(interval.end);
  const minutesArray: Date[] = [];

  const step = options?.step || 1; // Defina um passo padrão caso não seja fornecido

  if (step < 1 || isNaN(step)) {
    throw new Error("Step must be a number greater than 0");
  }

  if (startDate > endDate) {
    throw new Error("Start date is after end date");
  }

  eachMinuteDateFns({ start: startDate, end: endDate }, options).forEach(
    (minute: Date) => {
      minutesArray.push(minute);
    }
  );

  return minutesArray;
};

export const setMinutes = (date: number | Date, minutes: number): Date => {
  return setMinutesDateFns(date, minutes);
};
export const setHours = (date: number | Date, hours: number): Date => {
  return setHoursDateFns(date, hours);
};
export const setSeconds = (date: number | Date, seconds: number): Date => {
  return setSecondsDateFns(date, seconds);
};
export const setMili = (date: number | Date, hours: number): Date => {
  return setMiliDateFns(date, hours);
};
export const differenceInMinutes = (date: number | Date, date2: number | Date): number => {
  return differenceInMinutesDateFns(date, date2);
};
export const differenceInDays = (date: number | Date, date2: number | Date): number => {
  return differenceInDaysDateFns(date, date2);
};

export const dayOfWeek = (date: number | Date): string => {
  // Retorna o dia da semana - Como getDayDateFns retorna número, fiz um switch para retornar o dia da semana
  const result = getDayDateFns(date);
  switch (result) {
  case 0:
    return "sunday";
  case 1:
    return "monday";
  case 2:
    return "tuesday";
  case 3:
    return "wednesday";
  case 4:
    return "thursday";
  case 5:
    return "friday";
  case 6:
    return "saturday";
  }
};

export const subMinutes = (date: number | Date, minutes: number): Date => {
  //Subtrair minutos de uma data
  return subMinutesDateFns(date, minutes);
};
export const subDays = (date: number | Date, days: number): Date => {
  //Subtrair dias de uma data
  return subDaysDateFns(date, days);
};

export const isAfter = (date: number | Date, date2: number | Date): boolean => {
  //Saber se esta no passado
  return isAfterDateFns(date, date2);
};
export const isToday = (date: number | Date): boolean => {
  return isTodayDateFns(date);
};

export const cloneDate = (date: number | Date): Date => {
  //Clonar uma data
  return toDateDateFns(date);
};

export const isBefore = (date: number | Date, date2: number | Date): boolean => {
  return isBeforeDateFns(date, date2);
};

export const trataTimezone = (date: number | Date): Date => {
  //Tratar timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return utcToZonedTimeDateFns(date, timezone);
};
