import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { RefreshTokenMiddleware } from "@/application/infra/middlewares";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeRefreshTokenMiddleware = (roles: string[]): Middleware => {
  return new RefreshTokenMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const refreshtokenClient = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["client", "admin"]));
export const refreshtokenAdmin = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["admin"]));
export const refreshtokenProfessional = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["professional", "admin"]));
export const refreshtokenVisitor = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["professional", "client", "visitor", "admin"])
  );
export const refreshtokenLogged = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["professional", "client", "admin"])
  );