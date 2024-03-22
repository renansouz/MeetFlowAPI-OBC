import { OrderData } from "@/slices/order/entities";

export type RequestData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    message: string;
    serviceId: string;
    scheduleId: string;
    clientId: string;
    clientUserId?: string;
    professionalId: string;
    status: string;
    createdForId: string;
    updatedById?: string | null;
    updatedByRole?: string | null;
    order?: OrderData;
    initDate: string;
    endDate: string;
    cancelledAt?: Date | null;
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
  message: string;
  serviceId: string;
  scheduleId: string;
  clientId: string;
  clientUserId?: string;
  professionalId: string;
  status: string;
  createdForId: string;
  updatedById?: string | null;
  updatedByRole?: string | null;
  order?: OrderData;
  initDate: string;
  endDate: string;
  cancelledAt?: Date | null;
  constructor(data: RequestData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.message = data.message;
    this.serviceId = data.serviceId;
    this.scheduleId = data.scheduleId;
    this.clientId = data.clientId;
    this.clientUserId = data.clientUserId;
    this.professionalId = data.professionalId;
    this.status = "solicitado";
    this.createdForId = data.createdForId;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.cancelledAt = data.cancelledAt;
    this.order = data.order;
    this.updatedById = null;
    this.updatedByRole = null;
  }
}
