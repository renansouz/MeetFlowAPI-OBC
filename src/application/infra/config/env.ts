import { z } from "zod";

export const envSchema = z.object({
  mongoUri: z.string().url({ message: "MONGO_URL inválida" }).default("mongodb://127.0.0.1:56328"),
  jwtPrivateSecret: z.string(),
  jwtPublicSecret: z.string(),
  jwtRefreshPrivateSecret: z.string().default("privateRefreshToken"),
  jwtRefreshPublicSecret: z.string().default("publicRefreshToken"),
  port: z.coerce.number().optional().default(3333),
  environment: z.enum(["development", "test", "production"], {
    errorMap: () => ({ message: "O ambiente deve ser development, test ou production" })
  }).default("development"),
});

const mappedEnv = {
  mongoUri: process.env.MONGO_URL,
  jwtPrivateSecret: process.env.JWT_PRIVATE_KEY,
  jwtPublicSecret: process.env.JWT_PUBLIC_KEY,
  jwtRefreshPrivateSecret: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwtRefreshPublicSecret: process.env.JWT_PUBLIC_PRIVATE_KEY,
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
};

export type EnvInfer = z.infer<typeof envSchema>

export const env: EnvInfer= envSchema.parse(mappedEnv);

// export const env = {
//   mongoUri: process.env.MONGO_URL ?? "mongodb://127.0.0.1:56328",
//   jwtPrivateSecret: process.env.JWT_PRIVATE_KEY,
//   jwtPublicSecret: process.env.JWT_PUBLIC_KEY,
//   jwtRefreshPrivateSecret: process.env.JWT_REFRESH_PRIVATE_KEY,
//   jwtRefreshPublicSecret: process.env.JWT_PUBLIC_PRIVATE_KEY,
//   port: process.env.PORT ?? 3333,
//   environment: process.env.NODE_ENV ?? "development",
// };