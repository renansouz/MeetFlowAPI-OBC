import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";
import { DeleteServiceRepository } from "@/slices/service/repositories";

export type DeleteService = (query: Query) => Promise<ServiceData | null>;

export type DeleteServiceSignature = (
    deleteService: DeleteServiceRepository
) => DeleteService;

export const deleteService: DeleteServiceSignature =
    (deleteServiceRepository: DeleteServiceRepository) => (query: Query) => {
      return deleteServiceRepository.deleteService(query);
    };
