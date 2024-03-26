export type UserData = {
    _id?: string;
    createdById: string;
    name: string;
    email: string;
    role: string;
    password: string;
    scheduleId?: string;
    myScheduleId?: string;
    appointmentsTotal?: number;
    photoUrl?: string;
    photoId?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UserPaginated = {
    users: UserData[];
    total: number;
};

export class UserEntity {
  _id?: string;
  createdById: string;
  name: string;
  email: string;
  role: string;
  password: string;
  scheduleId?: string;
  myScheduleId?: string;
  appointmentsTotal?: number;
  photoUrl?: string;
  photoId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: UserData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.password = data.password;
    this.scheduleId = data.scheduleId;
    this.myScheduleId = data.myScheduleId;
    this.appointmentsTotal = 0;
    this.photoUrl = data.photoUrl;
    this.photoId = data.photoId;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
