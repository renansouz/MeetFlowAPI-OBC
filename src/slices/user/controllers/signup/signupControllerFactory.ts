import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeGoogleOAuthServiceFactory } from "@/application/infra/oAuth";
import { makeAddAccountFactory } from "@/slices/account/useCases";
import { SignupController } from "@/slices/user/controllers";
import { makeAddUserFactory, makeLoadUserFactory } from "@/slices/user/useCases";

export const makeSignupController = (): Controller => {
  const requiredFields = [
    "email",
    "password",
  ];
  return makeLogController(
    "signup",
    new SignupController(
      makeValidationComposite(requiredFields), // Validações de campos obrigatórios
      makeAddUserFactory(), // Adiciona usuário
      makeLoadUserFactory(), // Carrega usuário
      makeDbAuthentication(), // Autenticação
      makeAddAccountFactory(), // Guarda o token e refresh token
      makeGoogleOAuthServiceFactory() // Serviço de autenticação com Google
    )
  );
};