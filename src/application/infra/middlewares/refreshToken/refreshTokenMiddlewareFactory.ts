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
export const refreshtokenSchedule = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["schedule", "admin"]));
export const refreshtokenProfessional = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["schedule", "professional", "admin"]));
export const refreshtokenVisitor = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["schedule", "professional", "client", "visitor", "admin"])
  );
export const refreshtokenLogged = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["schedule", "professional", "client", "admin"])
  );