export type AccountData = {
    _id?: string;
    createdById?: string;
    name?: string;
    active?: boolean;
    type?: string;
    provider?: string;
    providerAccountId?: string;
    accessToken?: string;
    tokenType?: string;
    scope?: string;
    idToken?: string;
    sessionState?: string;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
    expiresAt?: string | number;
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
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
  expiresAt?: string | number;
  constructor(data: AccountData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
    this.active = true;
    this.type = data.type;
    this.provider = data.provider;
    this.providerAccountId = data.providerAccountId;
    this.accessToken = data.accessToken;
    this.tokenType = data.tokenType;
    this.scope = data.scope;
    this.idToken = data.idToken;
    this.sessionState = data.sessionState;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
