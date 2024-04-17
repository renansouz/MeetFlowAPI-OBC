const bodyAddAppointmentJsonSchema = {
  type: "object",
  required: [
    "message",
    "serviceId",
    "scheduleId",
    "professionalId",
    "clientId",
    "endDate",
    "initDate",
    "haveRecurrence",
    // "type",
    "requestId",
    "status",
  ],
  properties: {
    message: { type: "string" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    requestId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    active: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addAppointmentResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    requestId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
    active: { type: "boolean" },
    cancelled: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addAppointmentPostSchema = {
  schema: {
    body: bodyAddAppointmentJsonSchema,
    response: { 200: addAppointmentResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadAppointmentSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadAppointmentResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    requestId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
    cancelled: { type: "boolean" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadAppointmentGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadAppointmentSchema,
    response: {
      200: loadAppointmentResponse,
    },
  },
};

const queryStringJsonloadAvailableTimesSchema = {
  type: "object",
  properties: {
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    date: { type: "string" },
  },
  required: ["date", "serviceId", "scheduleId", "professionalId"],
};
const loadAvailableTimesResponse = {
  type: "object",
  nullable: true,
  properties: {
    timeAvailableProfessional: { type: "array" },
    timeAvailable: { type: "array" },
  },
};
export const loadAvailableTimesSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonloadAvailableTimesSchema,
    response: {
      200: loadAvailableTimesResponse,
    },
  },
};
const deleteAppointmentResponse = { type: "boolean" };
const queryStringJsonDeleteAppointmentSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteAppointmentSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteAppointmentSchema,
    response: {
      200: deleteAppointmentResponse,
    },
  },
};
const queryStringJsonUpdateAppointmentSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateAppointmentResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    message: { type: "string" },
    serviceId: { type: "string", maxLength: 24, minLength: 24 },
    serviceName: { type: "string" },
    scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    professionalId: { type: "string", maxLength: 24, minLength: 24 },
    clientId: { type: "string", maxLength: 24, minLength: 24 },
    clientName: { type: "string" },
    clientEmail: { type: "string" },
    requestId: { type: "string", maxLength: 24, minLength: 24 },
    endDate: { type: "string" },
    initDate: { type: "string" },
    haveDelivery: { type: "boolean" },
    haveRecurrence: { type: "boolean" },
    haveFidelity: { type: "boolean" },
    haveRide: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateAppointmentBody = {
  type: "object",
  properties: {
    message: { type: "string" },
    // serviceId: { type: "string", maxLength: 24, minLength: 24 },
    // scheduleId: { type: "string", maxLength: 24, minLength: 24 },
    // professionalId: { type: "string", maxLength: 24, minLength: 24 },
    // clientId: { type: "string", maxLength: 24, minLength: 24 },
    // clientName: { type: "string" },
    // clientEmail: { type: "string" },
    // requestId: { type: "string", maxLength: 24, minLength: 24 },
    // endDate: { type: "string" },
    // initDate: { type: "string" },
    haveRecurrence: { type: "boolean" },
    active: { type: "boolean" },
    // type: { type: "string" },
    status: { type: "string" },
  },
};
export const updateAppointmentSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateAppointmentSchema,
    body: updateAppointmentBody,
    response: {
      200: updateAppointmentResponse,
    },
  },
};
const queryStringJsonLoadAppointmentByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadAppointmentByPageResponse = {
  type: "object",
  properties: {
    appointments: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
          message: { type: "string" },
          serviceId: { type: "string", maxLength: 24, minLength: 24 },
          serviceName: { type: "string" },
          scheduleId: { type: "string", maxLength: 24, minLength: 24 },
          professionalId: { type: "string", maxLength: 24, minLength: 24 },
          clientId: { type: "string", maxLength: 24, minLength: 24 },
          clientName: { type: "string" },
          clientEmail: { type: "string" },
          requestId: { type: "string", maxLength: 24, minLength: 24 },
          endDate: { type: "string" },
          initDate: { type: "string" },
          haveRecurrence: { type: "boolean" },
          type: { type: "string" },
          status: { type: "string" },
          cancelled: { type: "boolean" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadAppointmentByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadAppointmentByPageSchema,
    response: {
      200: loadAppointmentByPageResponse,
    },
  },
};