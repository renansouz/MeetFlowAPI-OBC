import { ScheduleData } from "@/slices/schedule/entities";

export interface AddScheduleRepository {
    addSchedule(schedule: ScheduleData): Promise<ScheduleData | null>;
}
