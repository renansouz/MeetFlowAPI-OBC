const bodyAddRequestJsonSchema = {
  type: "object",
  required: [
    "serviceId",
    "scheduleId",
    "clientId",
    "professionalId",
    "endDate",
    "initDate",
    "haveRecurrence",
    // "type",
    "status",
    "duration",
  ],
  properties: {
    message: { type: "string" },
    duration: { type: "number" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
    active: { type: "boolean" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addRequestResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    duration: { type: "number" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    type: { type: "string" },
    status: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRequestPostSchema = {
  schema: {
    body: bodyAddRequestJsonSchema,
    response: { 200: addRequestResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadRequestSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadRequestResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    duration: { type: "number" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRequestGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadRequestSchema,
    response: {
      200: loadRequestResponse,
    },
  },
};
const deleteRequestResponse = { type: "boolean" };
const queryStringJsonDeleteRequestSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteRequestSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteRequestSchema,
    response: {
      200: deleteRequestResponse,
    },
  },
};
const queryStringJsonUpdateRequestSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateRequestResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    duration: { type: "number" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    active: { type: "boolean" },
    status: { type: "string" },
    cancelled: { type: "boolean" },
    createdById: { type: "string" },
  },
};
const updateRequestBody = {
  type: "object",
  properties: {
    message: { type: "string" },
    duration: { type: "number" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    active: { type: "boolean" },
    cancelled: { type: "boolean" },
    cancelledBy: { type: "string" },
    cancelledAt: { type: "string" },
    status: { type: "string" },
  },
};
export const updateRequestSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateRequestSchema,
    body: updateRequestBody,
    response: {
      200: updateRequestResponse,
    },
  },
};
const queryStringJsonLoadRequestByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRequestByPageResponse = {
  type: "object",
  properties: {
    requests: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
          message: { type: "string" },
          duration: { type: "number" },
          serviceId: { type: "string", maxLength: 24, minLength: 24 },
          serviceName: { type: "string" },
          scheduleId: { type: "string", maxLength: 24, minLength: 24 },
          clientId: { type: "string", maxLength: 24, minLength: 24 },
          clientName: { type: "string" },
          clientEmail: { type: "string" },
          professionalId: { type: "string", maxLength: 24, minLength: 24 },
          endDate: { type: "string" },
          initDate: { type: "string" },
          haveRecurrence: { type: "boolean" },
          // type: { type: "string" },
          status: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadRequestByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadRequestByPageSchema,
    response: {
      200: loadRequestByPageResponse,
    },
  },
};
