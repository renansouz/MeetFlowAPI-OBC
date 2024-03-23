import { UpdateClientRepository } from "@/slices/client/repositories";
import { AddOrderRepository } from "@/slices/order/repositories";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { UpdateUserRepository } from "@/slices/user/repositories";

import { AbstractHandler } from "../contracts";

export class OrderHandler extends AbstractHandler {
  constructor(
    private readonly orderRepository: AddOrderRepository,
    private readonly serviceRepository: UpdateServiceRepository,
    private readonly userRepository: UpdateUserRepository,
    private readonly clientRepository: UpdateClientRepository
  ) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (request?.status === "finalizado") {
      const orderAdded = await this.orderRepository.addOrder({
        name: "pedidoEfetivado",
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        totalValue: request?.order?.totalValue,
        professionalId: request?.professionalId,
        scheduleId: request?.scheduleId,
        clientId: request?.clientId,
        appointmentDate: request?.order?.appointmentDate,
        active: true,
      });
      if (!orderAdded) {
        throw new Error("Não foi possível criar o pedido");
      }
      const incrementAppointmentsService =
        await this.serviceRepository.incrementAppointmentsTotal({
          fields: { _id: request?.serviceId },
          options:{}
        });
      if (!incrementAppointmentsService) {
        throw new Error("Erro ao incrementar o total de agendamentos da tabela service");
      }
      const incrementAppointmentsProfessional =
        await this.userRepository.incrementAppointmentsTotal({
          fields: { _id: request?.professionalId },
          options:{}
        });
      if (!incrementAppointmentsProfessional) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para professional"
        );
      }
      const incrementAppointmentsSchedule =
        await this.userRepository.incrementAppointmentsTotal({
          fields: { _id: request?.scheduleId },
          options:{}
        });
      if (!incrementAppointmentsSchedule) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para schedule"
        );
      }
      const incrementAppointmentsClientUserId =
        await this.userRepository.incrementAppointmentsTotal({
          fields: { _id: request?.clientUserId },
          options:{}
        });
      if (!incrementAppointmentsClientUserId) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para client"
        );
      }
      const incrementAppointmentsClientId =
        await this.clientRepository.incrementAppointmentsTotal({
          fields: { _id: request?.clientId },
          options:{}
        });
      if (!incrementAppointmentsClientId) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela client para client"
        );
      }
    }
    return super.handle(request);
  }
}