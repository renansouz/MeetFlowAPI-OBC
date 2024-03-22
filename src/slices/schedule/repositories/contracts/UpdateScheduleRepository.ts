import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";

export interface UpdateScheduleRepository {
    updateSchedule(query: Query, data: ScheduleData): Promise<ScheduleData | null>;
}
