import { RequestData,RequestEntity } from "@/slices/request/entities";
import { AddRequestRepository } from "@/slices/request/repositories";

export type AddRequest = (data: RequestData) => Promise<RequestEntity | null>;

export type AddRequestSignature = (addRequest: AddRequestRepository) => AddRequest;

export const addRequest: AddRequestSignature =
    (addRequestRepository: AddRequestRepository) => (data: RequestData) => {
      return addRequestRepository.addRequest(new RequestEntity(data));
    };
