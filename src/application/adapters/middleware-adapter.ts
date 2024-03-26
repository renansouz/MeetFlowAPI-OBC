import { ServerError } from "@/application/errors";
import { HttpRequest } from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: any, reply: any) => {
    const httpRequest: HttpRequest = { headers: request.headers };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      request.requestContext.set("context", httpResponse?.data); // Guardar o usuário logado no contexto da requisição
    } else if (httpResponse?.data) {
      reply.code(httpResponse.statusCode).send(httpResponse.data);
    } else {
      reply.code(500).send(new ServerError(new Error("Internal Server Error")));
    }
  };
};