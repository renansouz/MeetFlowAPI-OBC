import { fromUnixTime,isBefore } from "date-fns";
import { google } from "googleapis";

import { LoadAccount, UpdateAccount } from "@/slices/account/useCases";


export class GoogleOAuthService {
  constructor(
    private readonly loadAccount: LoadAccount,
    private readonly updateAccount: UpdateAccount
  ) {}

  async getGoogleOAuthToken(userId: string) {
    console.log("userId getGoogleOAuthToken", userId);
    const account = await this.loadAccount({
      fields: {
        createdById: userId,
        provider: "google",
      },
      options: {},
    });
    console.log("account getGoogleOAuthToken", account);

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    console.log("auth accessToken", auth);

    console.log("account expiresAt", account?.expiresAt);
    auth.setCredentials({
      access_token: account?.accessToken,
      refresh_token: account?.refreshToken,
      expiry_date: account?.expiresAt ? Number(account?.expiresAt) * 1000 : null,
    });

    if (!account?.expiresAt) {
      return auth;
    }

    // const isTokenExpired = dayjs(account.google.expires_at * 1000).isBefore(new Date());

    if (account?.expiresAt) {
      const expiryDateFromUnixTime = fromUnixTime(Number(account?.expiresAt));
      console.log("expiryDate fromUnixTime", expiryDateFromUnixTime);
      console.log("expiryDate fromUnixTime converte Number", fromUnixTime(Number(account?.expiresAt)));
      const expiryDate = new Date(account?.expiresAt);
      console.log("expiryDate Javascript", expiryDate);
      const isTokenExpired = isBefore(expiryDate, new Date());
  
      if (isTokenExpired) {
        const { credentials } = await auth.refreshAccessToken();
        const {
          access_token,
          expiry_date,
          id_token,
          refresh_token,
          scope,
          token_type,
        } = credentials;

        const query = {
          fields: {
            createdById: account.createdById,
          },
          options: {},
        };
      
        const data = {
          createdById: account.createdById,
          name: account.name,
          accessToken: access_token || undefined,
          expiresAt: expiry_date ? Math.floor(expiry_date / 1000).toString() : undefined,
          idToken: id_token || undefined,
          refreshToken: refresh_token || undefined,
          scope: scope || undefined,
          tokenType: token_type || undefined,
        };
      
        await this.updateAccount(query, data);
        auth.setCredentials({
          access_token,
          refresh_token,
          expiry_date,
        });
      }
    }

    return auth;
  }
}