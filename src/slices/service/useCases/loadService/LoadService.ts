import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";
import { LoadServiceRepository } from "@/slices/service/repositories";

export type LoadService = (query: Query) => Promise<ServiceData | null>;

export type LoadServiceSignature = (loadService: LoadServiceRepository) => LoadService;

export const loadService: LoadServiceSignature =
    (loadServiceRepository: LoadServiceRepository) => async (query: Query) => {
      return loadServiceRepository.loadService(query);
    };
