export type OrderData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    totalValue?: number;
    professionalId?: string;
    scheduleId?: string;
    requestId?: string;
    clientId?: string;
    appointmentDate?: Date;
};

export type OrderPaginated = {
    orders: OrderData[];
    total: number;
};

export class OrderEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  totalValue?: number;
  professionalId?: string;
  scheduleId?: string;
  requestId?: string;
  clientId?: string;
  appointmentDate?: Date;
  constructor(data: OrderData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.totalValue = data.totalValue;
    this.professionalId = data.professionalId;
    this.scheduleId = data.scheduleId;
    this.requestId = data.requestId;
    this.clientId = data.clientId;
    this.appointmentDate = data.appointmentDate;
  }
}
