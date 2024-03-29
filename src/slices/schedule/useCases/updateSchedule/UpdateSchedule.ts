import { cleanDataObject } from "@/application/helpers";
import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";
import { UpdateScheduleRepository } from "@/slices/schedule/repositories";

export type UpdateSchedule = (query: Query, data: ScheduleData) => Promise<ScheduleData | null>;

export type UpdateScheduleSignature = (updateSchedule: UpdateScheduleRepository) => UpdateSchedule;

export const updateSchedule: UpdateScheduleSignature =
  (updateScheduleRepository: UpdateScheduleRepository) =>
    async (query: Query, data: ScheduleData) => {
      return updateScheduleRepository.updateSchedule(
        query,
        cleanDataObject({
          forbiddenFields: ["_id", "createdById", "active"],
          allowedFields: [
            "hourStart1",
            "hourEnd1",
            "hourLunchStart1",
            "hourLunchEnd1",
            "hourStart2",
            "hourEnd2",
            "hourLunchStart2",
            "hourLunchEnd2",
            "hourStart3",
            "hourEnd3",
            "hourLunchStart3",
            "hourLunchEnd3",
            "days1",
            "days2",
            "days3",
            "name",
            "description",
          ],
          bodyObject: data,
        })
      );
    };
