export type Query = {
  fields: any;
  options?: QueryOptions & {userId?: string};
};

export type QueryOptions = {
  projection?: unknown;
  sort?: unknown;
  page?: number;
  limit?: number;
  userLoggedId?: string;
  indexToCreate?: any;
};
