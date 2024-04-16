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

export async function handleGoogleProfile(profile: any) {
  const loadUser = makeLoadUserFactory();
  const addUser = makeAddUserFactory();
  const authentication = makeDbAuthentication();
  const addAccount = makeAddAccountFactory();

  const userExists = await loadUser({
    fields: { email: profile.emails?.[0]?.value },
    options: { projection: { password: 0 } },
  });

  if (!userExists) {
    return await handleNewUser(profile, addUser, authentication, addAccount);
  } else {
    return await handleExistingUser(profile, authentication);
  }
}

async function handleNewUser(profile: Profile, addUser: AddUser, authentication: Authentication, addAccount: AddAccount) {
  const userCreated = await addUser({
    name: profile.displayName ?? profile.name?.givenName ?? "",
    email: profile.emails?.[0]?.value ?? "",
    role: "professional",
    password: profile.id,
    photoUrl: profile.photos?.[0]?.value,
    active: true,
  });

  const authResult = await authentication.auth(userCreated?.email ?? "", profile.id ?? "");
  if (!authResult) {
    console.error("Authentication failed");
    return;
  }
  const { accessToken, refreshToken } = authResult;

  await addAccount({
    createdById: userCreated?._id,
    name: userCreated?.name,
    refreshToken,
    provider: "google",
    idToken: profile.id,
    tokenType: "Bearer",
    active: true,
    createdAt: new Date(),
    expiresAt: addDays(new Date(), 1) as unknown as string,
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
    console.error("Authentication failed");
    return;
  }
  const { accessToken, refreshToken } = authResult;

  return { user: userExists, accessToken, refreshToken };
}