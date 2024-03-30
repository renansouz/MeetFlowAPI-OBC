import { UserData } from "@/slices/user/entities";
import { LoadProfessionalRepository } from "@/slices/user/repositories";

export type LoadProfessional = () => Promise<UserData | null>;

export type LoadProfessionalSignature = (loadProfessional: LoadProfessionalRepository) => LoadProfessional;

export const loadProfessional: LoadProfessionalSignature =
    (loadProfessionalRepository: LoadProfessionalRepository) => async () => {
      return loadProfessionalRepository.loadProfessional();
    };
