import { OrderData } from "@/slices/order/entities";
import { RecurrenceData } from "@/slices/recurrence/entities";

export type RequestData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    message?: string;
    serviceId: string;
    serviceName?: string;
    scheduleId: string;
    clientId: string;
    clientName?: string;
    professionalId: string;
    status: string;
    updatedById?: string | null;
    updatedByRole?: string | null;
    haveRecurrence?: boolean;
    recurrence?: RecurrenceData;
    order?: OrderData;
    duration?: number;
    initDate: string;
    endDate: string;
    cancelled?: boolean;
    cancelledAt?: Date | null;
    cancelledBy?: string;
};

export type RequestPaginated = {
    requests: RequestData[];
    total: number;
};

export class RequestEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  message?: string;
  serviceId: string;
  serviceName?: string;
  scheduleId: string;
  clientId: string;
  clientName?: string;
  professionalId: string;
  status: string;
  updatedById?: string | null;
  updatedByRole?: string | null;
  haveRecurrence?: boolean;
  recurrence?: RecurrenceData;
  order?: OrderData;
  duration?: number;
  initDate: string;
  endDate: string;
  cancelled?: boolean;
  cancelledAt?: Date | null;
  cancelledBy?: string;
  constructor(data: RequestData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = data.active;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.message = data.message;
    this.serviceId = data.serviceId;
    this.serviceName = data.serviceName;
    this.scheduleId = data.scheduleId;
    this.clientId = data.clientId;
    this.clientName = data.clientName;
    this.professionalId = data.professionalId;
    this.status = "solicitado";
    this.haveRecurrence = data.haveRecurrence;
    this.duration = data.duration;
    this.recurrence = data.recurrence;
    this.order = data.order;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.cancelled = data.cancelled;
    this.cancelledAt = data.cancelledAt;
    this.cancelledBy = data.cancelledBy;
    this.updatedById = null;
    this.updatedByRole = null;
  }
}
