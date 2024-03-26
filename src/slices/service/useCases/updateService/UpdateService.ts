import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";
import { UpdateServiceRepository } from "@/slices/service/repositories";

export type UpdateService = (
    query: Query,
    data: ServiceData
) => Promise<ServiceData | null>;

export type UpdateServiceSignature = (
    updateService: UpdateServiceRepository
) => UpdateService;

export const updateService: UpdateServiceSignature =
    (updateServiceRepository: UpdateServiceRepository) =>
      async (query: Query, data: ServiceData) => {
        return updateServiceRepository.updateService(query, data);
      };
