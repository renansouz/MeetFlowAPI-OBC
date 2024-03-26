import { ClientData,ClientEntity } from "@/slices/client/entities";
import { AddClientRepository } from "@/slices/client/repositories";

export type AddClient = (data: ClientData) => Promise<ClientEntity | null>;

export type AddClientSignature = (addClient: AddClientRepository) => AddClient;

export const addClient: AddClientSignature =
    (addClientRepository: AddClientRepository) => (data: ClientData) => {
      return addClientRepository.addClient(new ClientEntity(data));
    };
