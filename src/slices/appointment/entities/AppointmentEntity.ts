export type AppointmentData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    requestId?: string; // Usuario que vai solicitar o serviço
    message?: string; // Mensagem para mandar via push notification ou email
    service?: string; // Nome do serviço
    serviceId?: string;
    scheduleId?: string;
    clientId?: string;
    professionalId?: string;
    status?: string;
    createdForId?: string;
    cancelled?: boolean;
    email?: boolean;
    initDate?: Date;
    endDate?: Date;
    cancelledAt?: Date | null;
    cancelledBy?: string;
};

export type AppointmentPaginated = {
    appointments: AppointmentData[];
    total: number;
};

export class AppointmentEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  requestId?: string;
  message?: string;
  service?: string;
  scheduleId?: string;
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  status?: string;
  createdForId?: string;
  cancelled?: boolean;
  email?: boolean;
  initDate?: Date;
  endDate?: Date;
  cancelledAt?: Date | null;
  cancelledBy?: string;
  constructor(data: AppointmentData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.requestId = data.requestId;
    this.message = data.message;
    this.serviceId = data.serviceId;
    this.scheduleId = data.scheduleId;
    this.clientId = data.clientId;
    this.professionalId = data.professionalId;
    this.status = data.status;
    this.createdForId = data.createdForId;
    this.cancelled = false;
    this.email = data.email;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.cancelledAt = data.cancelledAt;
    this.cancelledBy = data.cancelledBy;
  }
}
export type ScheduleAppointmentInfo = {
    hourEnd1: any;
    hourLunchEnd1?: any;
    hourLunchStart1?: any;
    hourStart1: any;
    hourEnd2?: any;
    hourEnd3?: any;
    hourLunchEnd2?: any;
    hourLunchEnd3?: any;
    hourLunchStart2?: any;
    hourLunchStart3?: any;
    hourStart2?: any;
    hourStart3?: any;
    days1: any;
    days2?: any;
    days3?: any;
};
export type AvailableTimesModelRepository = {
    _id: ScheduleAppointmentInfo;
    data: Array<any>;
};
export type QueryAvailableTimesRepository = {
    professionalId: string | undefined;
    endDay: string | undefined;
    initDay: string | undefined;
};
export type QueryAvailableTimes = {
    professionalId: string | null;
    date: string | null;
    serviceId: string | null;
    scheduleId: string | null;
};
export type QueryVerifyAvailableTimes = QueryAvailableTimes & {
    initDate: Date | string | null;
    endDate: Date | string | null;
};
