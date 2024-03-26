import { Query } from "@/application/types";
import { ScheduleData } from "@/slices/schedule/entities";

export interface LoadScheduleRepository {
    loadSchedule(query: Query): Promise<ScheduleData | null>;
}
