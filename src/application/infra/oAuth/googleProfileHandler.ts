import { makeDbAuthentication } from "@/application/factories";
import { addDays,Authentication } from "@/application/helpers";
import { AddAccount, makeAddAccountFactory } from "@/slices/account/useCases";
import { AddUser, makeAddUserFactory, makeLoadUserFactory } from "@/slices/user/useCases";

interface Profile {
  displayName?: string;
  name?: { givenName: string };
  emails?: { value: string }[];
  id: string;
  photos?: { value: string }[];
}

export async function handleGoogleProfile(profile: Profile, accessToken: string, refreshToken: string, expiresIn: number, role: string) {
  const loadUser = makeLoadUserFactory();
  const addUser = makeAddUserFactory();
  const authentication = makeDbAuthentication();
  const addAccount = makeAddAccountFactory();

  const userExists = await loadUser({
    fields: { email: profile.emails?.[0]?.value },
    options: { projection: { password: 0 } },
  });

  if (!userExists) {
    return await handleNewUser(profile, addUser, authentication, addAccount, accessToken, refreshToken, expiresIn, role);
  } else {
    return await handleExistingUser(profile, authentication);
  }
}

async function handleNewUser(profile: Profile, addUser: AddUser, authentication: Authentication, addAccount: AddAccount, googleAccessToken: string, googleRefreshToken: string, expiresIn: number, role: string) {
  const userCreated = await addUser({
    name: profile.displayName ?? profile.name?.givenName ?? "",
    email: profile.emails?.[0]?.value ?? "",
    role,
    password: profile.id,
    photoUrl: profile.photos?.[0]?.value,
    active: true,
  });
  const authResult = await authentication.auth(userCreated?.email ?? "", profile.id ?? "");
  if (!authResult) {
    return;
  }
  const { accessToken, refreshToken } = authResult;

  await addAccount({
    createdById: userCreated?._id,
    name: userCreated?.name,
    refreshToken,
    googleAccessToken: googleAccessToken,
    googleRefreshToken: googleRefreshToken,
    provider: "google",
    idToken: profile.id,
    tokenType: "Bearer",
    active: true,
    createdAt: new Date(),
    expiresAt: addDays(new Date(), 1) as unknown as string,
    googleExpiresAt: expiresIn,
  });

  return { user: userCreated, accessToken, refreshToken };
}

async function handleExistingUser(profile: Profile, authentication: Authentication) {
  const loadUser = makeLoadUserFactory();
  const userExists = await loadUser({
    fields: { email: profile.emails?.[0]?.value },
    options: { projection: { password: 0 } },
  });

  const authResult = await authentication.auth(userExists?.email ?? "", profile.id ?? "");
  if (!authResult) {
    return;
  }
  const { accessToken, refreshToken } = authResult;

  return { user: userExists, accessToken, refreshToken };
}