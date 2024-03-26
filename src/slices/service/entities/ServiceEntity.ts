export type ServiceData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
    duration: number;
    description?: string;
    appointmentsTotal?: number;
};

export type ServicePaginated = {
    services: ServiceData[];
    total: number;
};

export class ServiceEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  price?: number;
  duration: number;
  description?: string;
  appointmentsTotal?: number;
  constructor(data: ServiceData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.name = data.name;
    this.description = data.description;
    this.appointmentsTotal = 0;
    this.price = data.price;
    this.duration = data.duration;
  }
}
