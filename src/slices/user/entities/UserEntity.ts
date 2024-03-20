export type UserData = {
    _id?: string;
    createdById: string;
    name: string;
    email: string;
    password: string;
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
  password: string;
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
    this.password = data.password;
    this.appointmentsTotal = 0;
    this.photoUrl = data.photoUrl;
    this.photoId = data.photoId;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
