const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addPhotoResponse = {
  type: "object",
};
export const addPhotoPostSchema = {
  schema: {
    response: { 200: addPhotoResponse },
    headers: headersJsonSchema,
  },
};
const deletePhotoResponse = { type: "boolean" };
const queryStringJsonDeletePhotoSchema = {
  type: "object",
  properties: {
    url: { type: "string"},
  },
  required: ["url"],
};
export const deletePhotoSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeletePhotoSchema,
    response: {
      200: deletePhotoResponse,
    },
  },
};
const queryStringJsonUpdatePhotoSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updatePhotoResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updatePhotoBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updatePhotoSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdatePhotoSchema,
    body: updatePhotoBody,
    response: {
      200: updatePhotoResponse,
    },
  },
};
