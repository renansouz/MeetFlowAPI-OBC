import { ForbiddenError, ServerError,UnauthorizedError } from "@/application/errors";

/* interface ResponseBody {
  message?: string;
  data?: any;
} */ 

export type HttpResponse<T = any> = { statusCode: number; data: T };

export type HttpRequest<T = any> = {
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  query?: T;
  userLogged?: T;
  userId?: string;
  file?: T;
};

export const success = <T = any>(data: T): HttpResponse<T> => ({ statusCode: 200, data });
export const badRequest = <T = string>(error: T): HttpResponse<T> => ({
  statusCode: 400,
  data: error,
});
export const unauthorized = (): HttpResponse<UnauthorizedError> => ({
  statusCode: 401,
  data: new UnauthorizedError(),
});
export const forbidden = (error: ForbiddenError): HttpResponse<ForbiddenError> => ({
  statusCode: 403,
  data: new ForbiddenError(error),
});
export const serverError = (error: ServerError): HttpResponse<ServerError> => ({
  statusCode: 500,
  data: new ServerError(error),
});