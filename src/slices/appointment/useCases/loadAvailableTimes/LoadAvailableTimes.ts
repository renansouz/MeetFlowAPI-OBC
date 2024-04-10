import { getArrayTimes, queryDateGenerator } from "@/application/helpers/date";
import { QueryAvailableTimes,ScheduleAppointmentInfo } from "@/slices/appointment/entities";
import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import { LoadScheduleRepository } from "@/slices/schedule/repositories";
import { LoadServiceRepository } from "@/slices/service/repositories";
import { LoadUserRepository } from "@/slices/user/repositories";

export type LoadAvailableTimes = (query: QueryAvailableTimes) => Promise<any | null>;
export type LoadAvailableTimesSignature = (
  loadAvailableTimesRepository: LoadAvailableTimesRepository,
  serviceRepository: LoadServiceRepository,
  userRepository: LoadUserRepository,
  scheduleRepository: LoadScheduleRepository
) => LoadAvailableTimes;
export const loadAvailableTimes: LoadAvailableTimesSignature =
  (loadAvailableTimesRepository, serviceRepository, userRepository, scheduleRepository) =>
    async (query: QueryAvailableTimes) => {
      console.log("query", query);
      const {
        date = null,
        serviceId = null,
        scheduleId = null,
      } = query || {};
      if (!date || !serviceId) {
        console.log("date or serviceId not found", date, serviceId);
        return null;
      }
      const service = await serviceRepository.loadService({
        fields: { _id: serviceId },
        options: {},
      });
      console.log("service", service);
      if (service?.duration) {
        const {
          dayOfWeekFound = null,
          endDay = null,
          initDay = null,
          dateQuery = null,
        } = queryDateGenerator(date) || {};
        if (!dayOfWeekFound || !endDay || !initDay || !dateQuery) {
          console.log("dayOfWeekFound or endDay or initDay or dateQuery not found", dayOfWeekFound, endDay, initDay, dateQuery);
          return null;
        }
        const { _id: infoSchedule = null, data: appointments = null } =
        (await loadAvailableTimesRepository.loadAvailableTimes({
          endDay,
          initDay,
        })) || {};
        console.log("infoSchedule", infoSchedule);
        console.log("appointments", appointments);
        if (infoSchedule && appointments) {
          //esse é o caso em que existem agendamentos para o profissional no dia
          return getArrayTimes({
            infoSchedule,
            appointments,
            dateQuery: dateQuery as Date,
            dayOfWeekFound,
            duration: service?.duration,
          });
        }
        if (scheduleId) {
          const professionalScheduleId: any = 
          (await scheduleRepository.loadSchedule({
            fields: { _id: scheduleId},
            options: {},
          }));
          console.log("professionalScheduleId", professionalScheduleId);
          const _id: string | null = professionalScheduleId?.createdById;          
          console.log("_id", _id);
          if (_id) {
            const {
              hourEnd1 = null,
              hourLunchEnd1 = null,
              hourLunchStart1 = null,
              hourStart1 = null,
              hourEnd2 = null,
              hourLunchEnd2 = null,
              hourLunchStart2 = null,
              hourStart2 = null,
              days1 = null,
              days2 = null,
              hourEnd3 = null,
              hourLunchEnd3 = null,
              hourLunchStart3 = null,
              hourStart3 = null,
              days3 = null,
            }: any = (await scheduleRepository.loadSchedule({
              fields: { createdById: _id },
              options: {},
            })) || {};
            if (!days1 || !hourEnd1 || !hourStart1) {
              console.log("days1 or hourEnd1 or hourStart1 not found", days1, hourEnd1, hourStart1);
              return null;
            }
            const infoScheduleAux: ScheduleAppointmentInfo = {
              hourEnd1,
              hourLunchEnd1,
              hourLunchStart1,
              hourStart1,
              hourEnd2,
              hourLunchEnd2,
              hourLunchStart2,
              hourStart2,
              days1,
              days2,
              hourEnd3,
              hourLunchEnd3,
              hourLunchStart3,
              hourStart3,
              days3,
            };
            return getArrayTimes({
              infoSchedule: infoScheduleAux,
              appointments: [],
              dateQuery: dateQuery as Date,
              dayOfWeekFound,
              duration: service?.duration,
            });
          }
        }
      }
      return null;
    };
