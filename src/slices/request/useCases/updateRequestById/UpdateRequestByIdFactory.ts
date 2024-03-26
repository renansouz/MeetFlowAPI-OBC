import { MongoRepository } from "@/application/infra";
import { AppointmentRepository } from "@/slices/appointment/repositories";
import { ClientRepository } from "@/slices/client/repositories";
import { OrderRepository } from "@/slices/order/repositories";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { RequestRepository } from "@/slices/request/repositories";
import { ServiceRepository } from "@/slices/service/repositories";
import { UserRepository } from "@/slices/user/repositories";

import { IUpdateRequestById } from "./contracts";
import { UpdateRequestById } from "./UpdateRequestById";

export const makeUpdateRequestByIdFactory = (): IUpdateRequestById => {
  return new UpdateRequestById(
    new RequestRepository(new MongoRepository("request")),
    new OrderRepository(new MongoRepository("order")),
    new AppointmentRepository(new MongoRepository("appointment")),
    new ServiceRepository(new MongoRepository("service")),
    new UserRepository(new MongoRepository("user")),
    new RecurrenceRepository(new MongoRepository("recurrence")),
    new ClientRepository(new MongoRepository("client"))
  );
};