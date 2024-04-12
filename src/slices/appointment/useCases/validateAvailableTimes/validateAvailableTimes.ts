import { intervalsOverlapping } from "@/application/helpers/dateFns";
import { QueryVerifyAvailableTimes } from "@/slices/appointment/entities/AppointmentEntity";
import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";

export type ValidateAvailableTimesSchema = (
    query: QueryVerifyAvailableTimes
) => Promise<any | null>;

export const validateAvailableTimes =
    (loadAvailableTimes: LoadAvailableTimes) =>
      async (query: QueryVerifyAvailableTimes) => {
        console.log("query validateAvailableTimes", query);
        const { initDate = null, endDate = null } = query || {};
        if (
          !initDate || !endDate ||
                endDate === initDate ||
                new Date(endDate).getTime() <= new Date(initDate).getTime()
        ) {
          return false;
        }
        console.log("initDate validateAvailableTimes", initDate);
        console.log("endDate validateAvailableTimes", endDate);
        const { timeAvailable = null, timeAvailableProfessional = null } =
            (await loadAvailableTimes(query)) || {};
        if (!timeAvailable && !timeAvailableProfessional) {
          console.log("timeAvailable ou timeAvailableProfessional  false");
          return false;
        }
        console.log("timeAvailable validateAvailableTimes", timeAvailable);
        console.log(
          "timeAvailableProfessional validateAvailableTimes",
          timeAvailableProfessional
        );
        const result = timeAvailable?.find(({ time }: any) => {
          return new Date(time).getTime() === new Date(initDate).getTime(); // Verificando se horário existe disponível.
        });
        console.log("result validateAvailableTimes", result);
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
          console.log("resultAlternative validateAvailableTimes", resultAlternative);
          return !!resultAlternative;
        }
        console.log("result true");
        return true;
      };
