const bodyJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation", "name", "role"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
    role: { type: "string", enum: ["client", "professional", "visitor"] },
  },
};
const signupResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
      user: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
        },
      },
    },
  },
};
export const signupPostSchema = {
  schema: {
    body: bodyJsonSchema,
    response: signupResponse,
  },
};
const bodyLoginJsonSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
};
const loginResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
      user: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
        },
      },
    },
  },
};
export const loginPostSchema = {
  schema: {
    body: bodyLoginJsonSchema,
    response: loginResponse,
  },
};