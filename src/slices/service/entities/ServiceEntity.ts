export type ServiceData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    categoryId: string;
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
  categoryId: string;
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
    this.createdById = data.createdById;
    this.appointmentsTotal = 0;
    this.categoryId = data.categoryId;
    this.duration = data.duration;
  }
}
