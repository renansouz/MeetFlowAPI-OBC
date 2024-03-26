import { Authentication,DbAuthentication } from "@/application/helpers";
import { BcryptAdapter, env, JwtAdapter, MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";

export const makeDbAuthentication = (): Authentication => {
  const salt = 8;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtPrivateSecret, env.jwtPublicSecret, "120d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshPrivateSecret, env.jwtRefreshPublicSecret, "10d");
  const userMongoRepository = new MongoRepository("user");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};