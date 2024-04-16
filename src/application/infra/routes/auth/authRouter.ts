import fastifyPassport from "@fastify/passport";
import { FastifyInstance, PassportUser } from "fastify";

import { loginAdapter,signupAdapter } from "./authAdapter";
import { loginPostSchema,signupPostSchema } from "./authSchema";

interface User extends PassportUser {
  accessToken: string;
  refreshToken: string;
  user: any;
}

const googleAuthOptions = {
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar",
  ],
};

const cookieOptions = { path: "/", maxAge: 7 * 24 * 60 * 60 }; // 7 days

export async function auth(fastify: FastifyInstance) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get("/auth/google", fastifyPassport.authenticate("google", googleAuthOptions));

  
  fastify.get("/auth/google/callback", 
    {
      preHandler: [
        fastifyPassport.authenticate("google", googleAuthOptions),
        (request, reply, next,) => {
          next();
        }
      ]
    },
    async (request, reply) => {
      const user = request.user as User;

      // Extract the scope parameter from the URL
      const url = new URL(request.url, "http://localhost:3333");
      const scopes = url.searchParams.get("scope");

      const decodedScopes = decodeURIComponent(scopes || "").split(" ");
      if (!decodedScopes.includes("https://www.googleapis.com/auth/calendar")) {
        reply.code(400).send({ error: "Você deve permitir o escopo do calendário" });
        return;
      }
      if (user) {
        reply.setCookie("meetFlow.token", user.accessToken, cookieOptions);
        reply.setCookie("meetFlow.refreshToken", user.refreshToken, cookieOptions);
        reply.setCookie("meetFlow.user", JSON.stringify(user.user), cookieOptions);
      }
      reply.redirect("http://localhost:5173/dashboard");
    }
  );
}
