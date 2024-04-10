const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addPhotoResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    url: { type: "string" },
    title: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addPhotoPostSchema = {
  response: { 200: addPhotoResponse },
  headers: headersJsonSchema,
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
