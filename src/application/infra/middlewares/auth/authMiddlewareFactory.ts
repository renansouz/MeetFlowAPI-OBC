import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { AuthMiddleware } from "@/application/infra/middlewares";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeAuthMiddleware = (roles: string[]): Middleware => {
  return new AuthMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authClient = () => adaptMiddleware(makeAuthMiddleware(["client", "admin"]));
export const authAdmin = () => adaptMiddleware(makeAuthMiddleware(["admin"]));
export const authProfessional = () =>
  adaptMiddleware(makeAuthMiddleware(["professional", "admin"]));
export const authVisitor = () =>
  adaptMiddleware(
    makeAuthMiddleware(["professional", "client", "visitor", "admin"])
  );
export const authLogged = () =>
  adaptMiddleware(makeAuthMiddleware(["professional", "client", "admin"]));