import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RequestData, RequestPaginated } from "@/slices/request/entities";

import {
  AddRequestRepository,
  DeleteRequestRepository,
  LoadRequestByPageRepository,
  LoadRequestRepository,
  UpdateRequestRepository,
} from "./contracts";
export class RequestRepository
implements
        AddRequestRepository,
        DeleteRequestRepository,
        LoadRequestByPageRepository,
        LoadRequestRepository,
        UpdateRequestRepository
{
  constructor(private readonly repository: Repository) {}
  async addRequest(request: RequestData): Promise<RequestData | null> {
    return this.repository.add(request);
  }
  async deleteRequest(query: Query): Promise<RequestData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadRequestByPage(query: Query): Promise<RequestPaginated | null> {
    const { userId, status, createdById } = query.options || {};

    const filter: RequestData = { ...query.fields };
    if (userId) {
      filter.scheduleId = userId;
    }
    if (status) {
      filter.status = status;
    }
    if (createdById) {
      filter.createdById = createdById;
    }
    
    const requests = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      filter,
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(filter ?? {});
    return { requests, total };
  }
  async loadRequest(query: Query): Promise<RequestData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateRequest(query: Query, data: RequestData): Promise<RequestData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}