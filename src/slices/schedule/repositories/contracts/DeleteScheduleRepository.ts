import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";

export interface DeleteScheduleRepository {
    deleteSchedule(query: Query): Promise<ScheduleData | null>;
}
