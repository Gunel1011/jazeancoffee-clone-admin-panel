export enum userRoleEnum {
  ADMIN = "admin",
  USER = "user",
}
export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  profileImage: string;
  role: userRoleEnum;
  phone: string;
  address: string;
  age: number;
  registerDate: string;
  isActive: boolean;
  fullName: string;
}

export interface IUserRequest {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  profileImage?: File;
  role?: userRoleEnum;
  phone: string;
  address: string;
  age: number;
  isActive: boolean;
  fullName?: string;
}
export interface IUserImage {
  profileImage?: File;
}
