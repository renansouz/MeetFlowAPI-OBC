import { Query } from "@/application/types";
import { ClientData } from "@/slices/client/entities";
import { DeleteClientRepository } from "@/slices/client/repositories";

export type DeleteClient = (query: Query) => Promise<ClientData | null>;

export type DeleteClientSignature = (deleteClient: DeleteClientRepository) => DeleteClient;

export const deleteClient: DeleteClientSignature =
    (deleteClientRepository: DeleteClientRepository) => (query: Query) => {
      return deleteClientRepository.deleteClient(query);
    };
