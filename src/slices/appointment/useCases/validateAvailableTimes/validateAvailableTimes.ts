import { intervalsOverlapping } from "@/application/helpers/dateFns";
import { QueryVerifyAvailableTimes } from "@/slices/appointment/entities/AppointmentEntity";
import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";

export type ValidateAvailableTimesSchema = (
    query: QueryVerifyAvailableTimes
) => Promise<any | null>;

export const validateAvailableTimes =
    (loadAvailableTimes: LoadAvailableTimes) =>
      async (query: QueryVerifyAvailableTimes) => {
        const { initDate = null, endDate = null } = query || {};
        if (
          !initDate || !endDate ||
                endDate === initDate ||
                new Date(endDate).getTime() <= new Date(initDate).getTime()
        ) {
          return false;
        }
        console.log("query validate available Times", query);
        const { timeAvailable = null, timeAvailableProfessional = null } =
            (await loadAvailableTimes(query)) || {};
        if (!timeAvailable && !timeAvailableProfessional) {
          console.log ("timeAvailable validate available Times", timeAvailable || "timeAvailableProfessional", timeAvailableProfessional);
          return false;
        }
        const result = timeAvailable?.find(({ time }: any) => {
          return new Date(time).getTime() === new Date(initDate).getTime(); // Verificando se horário existe disponível.
        });
        console.log("result validate available Times", result);
        if (!result) {
          // Verificando se existe horário alternativo disponível.
          const resultAlternative = timeAvailableProfessional?.find((time: any) => {
            return intervalsOverlapping(
              new Date(initDate),
              new Date(endDate),
              new Date(time.initDate),
              new Date(time.endDate)
            );
          });
          console.log("resultAlternative validate available Times", resultAlternative);
          return !!resultAlternative;
        }
        return true;
      };
