
import { makeLoadAccountFactory, makeUpdateAccountFactory } from "@/slices/account/useCases";

import { GoogleOAuthService } from "./google";


export const makeGoogleOAuthServiceFactory = (): GoogleOAuthService => {
  const loadAccount = makeLoadAccountFactory();
  const updateAccount = makeUpdateAccountFactory();
  return new GoogleOAuthService(loadAccount, updateAccount);
};