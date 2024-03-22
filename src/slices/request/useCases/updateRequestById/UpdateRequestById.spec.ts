import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { subMinutes } from "@/application/helpers/dateFns";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { UpdateClientRepository } from "@/slices/client/repositories";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { AddOrderRepository } from "@/slices/order/repositories";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import {
  LoadRequestRepository,
  UpdateRequestRepository,
} from "@/slices/request/repositories";
import { UpdateRequestById } from "@/slices/request/useCases/updateRequestById/UpdateRequestById";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { UpdateUserRepository } from "@/slices/user/repositories";

describe("UpdateRequestById useCase", () => {
  let testInstance: UpdateRequestById;
  let mockRepo: MockProxy<UpdateRequestRepository & LoadRequestRepository>;
  let mockOrder: MockProxy<AddOrderRepository>;
  let mockAppointment: MockProxy<
    AddAppointmentRepository & LoadAppointmentRepository & UpdateAppointmentRepository>;
  let mockService: MockProxy<UpdateServiceRepository>;
  let mockClient: MockProxy<UpdateClientRepository>;
  let mockUser: MockProxy<UpdateUserRepository>;
  beforeAll(() => {
    MockDate.set(new Date());
    mockRepo = mock();
    mockRepo.updateRequest.mockResolvedValue({ ...fakeRequestEntity, status: "finalizado" });
    mockRepo.loadRequest.mockResolvedValue({
      ...fakeRequestEntity,
      status: "confirmado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    mockOrder = mock();
    mockOrder.addOrder.mockResolvedValue({ ...fakeOrderEntity });
    mockAppointment = mock();
    mockAppointment.addAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.loadAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.updateAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockService = mock();
    mockService.updateService.mockResolvedValue({ ...fakeServiceEntity });
    mockService.incrementAppointmentsTotal.mockResolvedValue({ ...fakeServiceEntity });
    mockClient = mock();
    mockClient.updateClient.mockResolvedValue({ ...fakeClientEntity });
    mockClient.incrementAppointmentsTotal.mockResolvedValue({ ...fakeClientEntity });
    mockUser = mock();
    mockUser.updateUser.mockResolvedValue({ ...fakeUserEntity });
    mockUser.incrementAppointmentsTotal.mockResolvedValue({ ...fakeUserEntity });
  });
  beforeEach(async () => {
    testInstance = new UpdateRequestById(
      mockRepo,
      mockOrder,
      mockAppointment,
      mockService,
      mockUser,
      mockClient
    );
  });
  afterAll(() => {
    MockDate.reset();
  });
  it("Should return an request updated with success", async () => {
    const request = await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: "finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(request).toEqual({ ...fakeRequestEntity, status: "finalizado" });
  });
  it("Should call updateRequest method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: "finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockRepo.updateRequest).toHaveBeenCalledWith(
      {
        fields: { _id: fakeRequestEntity._id },
        options: {},
      },
      {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      }
    );
    expect(mockRepo.updateRequest).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not updated request after call loadRequest", async () => {
    mockRepo.loadRequest.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao atualizar a solicitação");
  });
  it("Should throws if was not updated request after call updateRequest", async () => {
    mockRepo.updateRequest.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao atualizar a solicitação");
  });
  it("Should throws if loadRequest throws", async () => {
    mockRepo.loadRequest.mockRejectedValueOnce(new Error("any_error"));
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 	"finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("any_error");
  });
  it("Should throws if updateRequest throws", async () => {
    mockRepo.updateRequest.mockRejectedValueOnce(new Error("any_error"));
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("any_error");
  });
  it("should call incrementAppointmentsTotal of user method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: "finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.scheduleId },
      options:{}
    });
    expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledTimes(3);
  });
  it("should call incrementAppointmentsTotal of service method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: "finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.serviceId },
      options:{}
    });
    expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledTimes(1);
  });
  it("should call incrementAppointmentsTotal of client method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: "finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockClient.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.clientId },
      options:{}
    });
    expect(mockClient.incrementAppointmentsTotal).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not increment appointment after call incrementAppointmentsTotal of serviceRepository", async () => {
    mockService.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao incrementar o total de agendamentos da tabela service");
  });
  it("Should throws if was not increment appointment after call incrementAppointmentsTotal of clientRepository", async () => {
    mockClient.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela client para client"
    );
  });
  it("Should throws if was not increment appointment after first call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado" ,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para professional"
    );
  });
  it("Should throws if was not increment appointment after second call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para schedule"
    );
  });
  it("Should throws if was not increment appointment after third call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para client"
    );
  });
  it("Should throws if was not add order after call addOrder of orderRepository", async () => {
    mockOrder.addOrder.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar o pedido");
  });
  test("should call mockOrder.addOrder method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: 	"finalizado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockOrder.addOrder).toHaveBeenCalledWith({
      name: "pedidoEfetivado",
      createdById: fakeRequestEntity?.createdById,
      createdAt: new Date(),
      scheduleId: fakeRequestEntity?.scheduleId,
      clientId: fakeRequestEntity?.clientId,
      professionalId: fakeRequestEntity?.professionalId,
      appointmentDate: fakeRequestEntity?.order?.appointmentDate,
      updatedAt: new Date(),
      active: true,
    });
    expect(mockOrder.addOrder).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not add appointment after call add appointment of appointmentRepository when status updated is 1", async () => {
    mockAppointment.addAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: "confirmado",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar o agendamento");
  });

  it("Should throws if was not add appointment after call updateAppointment of appointmentRepository when status updated is 2", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: "cancelado_profissional",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
  it("Should throws if was not add Appointment after call updateAppointment of AppointmentRepository when status updated is 3", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: "cancelado_cliente",
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: "finalizado",
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
});