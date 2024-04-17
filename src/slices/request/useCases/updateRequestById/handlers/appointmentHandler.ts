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

      const existingAppointment = await this.appointmentRepository.loadAppointment({
        fields: { requestId: request?._id },
        options: {},
      });

      if(!existingAppointment?._id){
        const appointmentCreated = await this.appointmentRepository.addAppointment({
          requestId: request?._id,
          name: request?.name,
          message: request?.message,
          serviceId: request?.serviceId,
          serviceName: request?.serviceName,
          scheduleId: request?.scheduleId,
          professionalId: request?.professionalId,
          clientId: request?.clientId,
          clientName: request?.clientName,
          clientEmail: request?.clientEmail,
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

/* 
Implementar utilizando a clean Architecture o googleOAuthService

import { google } from "googleapis";
import { addHours, parseISO } from "@/application/helpers";
import { GoogleOAuthService } from "@/application/infra/oAuth";

// ...

export class AppointmentHandler extends AbstractHandler {
  constructor(
    private readonly appointmentRepository: AddAppointmentRepository &
      LoadAppointmentRepository &
      UpdateAppointmentRepository,
    private readonly googleOAuthService: GoogleOAuthService, // Injetar o GoogleOAuthService
  ) {
    super();
  }

  // ...

  override async handle(request: any): Promise<any> {
    // ...

    if (request?.status === "confirmado") {
      // ...

      if (!appointmentCreated) {
        throw new Error("Não foi possível criar o agendamento");
      }

      // After creating the appointment, create a Google Calendar event
      const auth = await this.googleOAuthService.getGoogleOAuthToken(request?.createdById);
      const calendar = google.calendar({ version: "v3", auth });

      const event = {
        // ...
      };

      await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        requestBody: event,
      });
    }

    // ...

    return super.handle(request);
  }
}
*/