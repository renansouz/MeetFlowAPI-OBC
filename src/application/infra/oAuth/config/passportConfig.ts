import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { env } from "@/application/infra";
import {  makeLoadUserFactory } from "@/slices/user/useCases";

import { handleGoogleProfile } from "../googleProfileHandler";

fastifyPassport.use(new GoogleStrategy({
  clientID: env.googleClientId,
  clientSecret: env.googleClientSecret,
  callbackURL: "http://localhost:3333/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await handleGoogleProfile(profile);
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
}
)
);

fastifyPassport.registerUserSerializer(async (user: any) => {
  return user.user._id; 
});

fastifyPassport.registerUserDeserializer(async (id) => {
  const loadUser = makeLoadUserFactory();
  const user = await loadUser({
    fields: { _id: id },
    options: {},
  });
  return user;
});