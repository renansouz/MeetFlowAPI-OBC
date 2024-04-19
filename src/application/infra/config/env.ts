import { z } from "zod";

export const envSchema = z.object({
  mongoUri: z.string().url({ message: "MONGO_URL inválida" }).default("mongodb://127.0.0.1:56328"),
  jwtSecret: z.string().default("secret"),
  jwtRefreshSecret: z.string().default("secret"),
  redisPort: z.coerce.number().optional().default(40043),
  redisUrl: z.string().optional().default("us1-redis-example-40000.upstash.io"),
  redisPassword: z.string().optional(),
  cloudflareAccountId: z.string(),
  awsBucketName: z.string(),
  awsAccessKeyId: z.string(),
  awsSecretAccessKey: z.string(),
  oAuthSecret: z.string(),
  googleClientId: z.string(),
  googleClientSecret: z.string(),
  port: z.coerce.number().optional().default(8080),
  environment: z.enum(["development", "test", "production"], {
    errorMap: () => ({ message: "O ambiente deve ser development, test ou production" })
  }).default("development"),
  // Update further RS256
  // jwtPrivateSecret: z.string(),
  // jwtPublicSecret: z.string(),
  // jwtRefreshPrivateSecret: z.string().default("privateRefreshToken"),
  // jwtRefreshPublicSecret: z.string().default("publicRefreshToken"),
});

const mappedEnv = {
  mongoUri: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  redisPort: process.env.REDIS_PORT,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  oAuthSecret: process.env.FASTIFY_oAuth_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //Update further RS256
  // jwtPrivateSecret: process.env.JWT_PRIVATE_KEY,
  // jwtPublicSecret: process.env.JWT_PUBLIC_KEY,
  // jwtRefreshPrivateSecret: process.env.JWT_REFRESH_PRIVATE_KEY,
  // jwtRefreshPublicSecret: process.env.JWT_PUBLIC_PRIVATE_KEY,
};

export type EnvInfer = z.infer<typeof envSchema>

export const env: EnvInfer= envSchema.parse(mappedEnv);