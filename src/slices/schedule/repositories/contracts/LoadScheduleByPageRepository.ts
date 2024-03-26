import { Query } from "@/application/types";
import { SchedulePaginated } from "@/slices/schedule/entities";

export interface LoadScheduleByPageRepository {
    loadScheduleByPage(query: Query): Promise<SchedulePaginated | null>;
}
