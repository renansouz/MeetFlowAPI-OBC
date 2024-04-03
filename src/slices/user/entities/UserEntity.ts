export type UserData = {
    _id?: string;
    name: string;
    email: string;
    role: string;
    password: string;
    scheduleId?: string;
    myScheduleId?: string;
    appointmentsTotal?: number;
    occupationArea?: string;
    headLine?: string;
    photoUrl?: string;
    photoId?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    serviceIds?: string[];
};

export type UserPaginated = {
    users: UserData[];
    total: number;
};

export class UserEntity {
  _id?: string;
  name: string;
  email: string;
  role: string;
  password: string;
  scheduleId?: string;
  myScheduleId?: string;
  appointmentsTotal?: number;
  occupationArea?: string;
  headLine?: string;
  photoUrl?: string;
  photoId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  serviceIds?: string[];
  constructor(data: UserData) {
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.password = data.password;
    this.scheduleId = data.scheduleId;
    this.myScheduleId = data.myScheduleId;
    this.appointmentsTotal = 0;
    this.occupationArea = data.occupationArea;
    this.headLine = data.headLine;
    this.photoUrl = data.photoUrl;
    this.photoId = data.photoId;
    this.serviceIds = data.serviceIds;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
