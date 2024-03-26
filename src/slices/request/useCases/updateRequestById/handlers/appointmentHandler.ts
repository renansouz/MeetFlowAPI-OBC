import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";

import { AbstractHandler } from "../contracts";

export class AppointmentHandler extends AbstractHandler {
  constructor(
        private readonly appointmentRepository: AddAppointmentRepository &
        LoadAppointmentRepository &
        UpdateAppointmentRepository
  ) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (request?.status === "confirmado") {
      const appointmentCreated = await this.appointmentRepository.addAppointment({
        requestId: request?._id,
        name: "agendamentoCriado",
        message: "mensagem",
        serviceId: request?.serviceId,
        scheduleId: request?.scheduleId,
        professionalId: request?.professionalId,
        clientId: request?.clientId,
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "confirmado",
        active: true,
        initDate: request?.initDate,
        endDate: request?.endDate,
        cancelled: false,
      });
      if (!appointmentCreated) {
        throw new Error("Não foi possível criar o agendamento");
      }
    } else if (
      request?.status === "cancelado_profissional" ||
            request?.status === "cancelado_cliente" 
    ) {
      const appointmentFound = await this.appointmentRepository.loadAppointment({
        fields: { _id: request?._id },
        options: {},
      });
      if (appointmentFound?._id) {
        const appointmentUpdated =
                    await this.appointmentRepository.updateAppointment(
                      {
                        fields: { _id: appointmentFound?._id },
                      },
                      {
                        ...appointmentFound,
                        cancelledAt: new Date(),
                        updatedAt: new Date(),
                        cancelled: true,
                        active: false,
                        cancelledBy: request?.createdById,
                      }
                    );
        if (!appointmentUpdated) {
          throw new Error("Não foi possível cancelar o agendamento");
        }
      }
    }
    return super.handle(request);
  }
}