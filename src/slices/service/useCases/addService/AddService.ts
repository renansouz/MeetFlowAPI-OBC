import { ServiceData,ServiceEntity } from "@/slices/service/entities";
import { AddServiceRepository } from "@/slices/service/repositories";

export type AddService = (data: ServiceData) => Promise<ServiceEntity | null>;

export type AddServiceSignature = (addService: AddServiceRepository) => AddService;

export const addService: AddServiceSignature =
    (addServiceRepository: AddServiceRepository) => (data: ServiceData) => {
      return addServiceRepository.addService(new ServiceEntity(data));
    };
