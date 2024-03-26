import { Query } from "@/application/types";
import { SchedulePaginated } from "@/slices/schedule/entities";
import { LoadScheduleByPageRepository } from "@/slices/schedule/repositories";

export type LoadScheduleByPage = (query: Query) => Promise<SchedulePaginated | null>;

export type LoadScheduleByPageSignature = (
    loadScheduleByPage: LoadScheduleByPageRepository
) => LoadScheduleByPage;

export const loadScheduleByPage: LoadScheduleByPageSignature =
    (loadScheduleByPageRepository: LoadScheduleByPageRepository) => async (query: Query) => {
      return loadScheduleByPageRepository.loadScheduleByPage(query);
    };
