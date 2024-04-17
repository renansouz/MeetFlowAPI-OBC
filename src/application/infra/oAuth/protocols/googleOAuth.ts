export interface GoogleOAuth {
  getGoogleOAuthToken(userId: string): Promise<any>;
}