export type AccountData = {
    _id?: string;
    createdById?: string;
    name?: string;
    active?: boolean;
    type?: string;
    provider?: string;
    providerAccountId?: string;
    accessToken?: string;
    googleAccessToken?: string;
    refreshToken?: string;
    googleRefreshToken?: string;
    tokenType?: string;
    scope?: string;
    idToken?: string;
    sessionState?: string;
    createdAt?: Date;
    updatedAt?: Date;
    expiresAt?: string | number;
    googleExpiresAt?: number;
};

export type AccountPaginated = {
    accounts: AccountData[];
    total: number;
};

export class AccountEntity {
  createdById?: string;
  name?: string;
  active?: boolean;
  type?: string;
  provider?: string;
  providerAccountId?: string;
  accessToken?: string;
  googleAccessToken?: string;
  refreshToken?: string;
  googleRefreshToken?: string;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string | number;
  googleExpiresAt?: number;
  constructor(data: AccountData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = true;
    this.type = data.type;
    this.provider = data.provider;
    this.providerAccountId = data.providerAccountId;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.googleAccessToken = data.googleAccessToken;
    this.googleRefreshToken = data.googleRefreshToken;
    this.tokenType = data.tokenType;
    this.scope = data.scope;
    this.idToken = data.idToken;
    this.sessionState = data.sessionState;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.expiresAt = data.expiresAt;
    this.googleExpiresAt = data.googleExpiresAt;
  }
}
