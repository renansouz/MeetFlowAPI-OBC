import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { ServiceData, ServicePaginated } from "@/slices/service/entities";

import {
  AddServiceRepository,
  DeleteServiceRepository,
  LoadServiceByPageRepository,
  LoadServiceRepository,
  UpdateServiceRepository,
} from "./contracts";
export class ServiceRepository
implements
        AddServiceRepository,
        DeleteServiceRepository,
        LoadServiceByPageRepository,
        LoadServiceRepository,
        UpdateServiceRepository
{
  async incrementAppointmentsTotal(query: Query): Promise<ServiceData | null> {
    return this.repository.increment(query?.fields ?? {}, {appointmentsTotal: 1});
  }
  constructor(private readonly repository: Repository) {}
  async addService(service: ServiceData): Promise<ServiceData | null> {
    return this.repository.add(service);
  }
  async deleteService(query: Query): Promise<ServiceData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadServiceByPage(query: Query): Promise<ServicePaginated | null> {

    const services = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { services, total };
  }
  async loadService(query: Query): Promise<ServiceData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateService(query: Query, data: ServiceData): Promise<ServiceData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}