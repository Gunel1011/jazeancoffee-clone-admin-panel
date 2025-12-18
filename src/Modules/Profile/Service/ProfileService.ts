import type { IUserNew, IUserRequest } from "../Models/ProfileModels";
import * as ProfileProvider from "../Provider/ProfileProvider";

export class ProfileService {
  static async getUserData() {
    return await ProfileProvider.getUserData().then((res) => {
      return {
        ...res.data,
        profileImage: `${import.meta.env.VITE_IMAGE_URL}/${res.data.profileImage
          }`,
      };
    });
  }
  static async editUserData(payload: IUserRequest) {
    return await ProfileProvider.putUserData(payload).then((res) => {
      return res.data;
    });
  }
  static async changeProfileImage(payload: FormData) {
    return await ProfileProvider.putUserImage(payload).then((res) => {
      return {
        ...res.data,
        profileImage: `${import.meta.env.VITE_IMAGE_URL}/${res.data.profileImage
          }`,
      };
    });
  }

  static async addNewUser(payload: IUserNew) {
    return await ProfileProvider.postNewUser(payload).then((res) => {
      return res.data;
    });
  }


  static async changeUserRole(userId: string, role: string) {
    return await ProfileProvider.changeUserRole(userId, role).then((res) => res.data);
  }


  static async changePassword(oldPassword: string, newPassword: string) {
    return await ProfileProvider.changePassword(oldPassword, newPassword).then((res) => res.data);
  }

  static async sendResetPasswordOTP(email: string) {
    return await ProfileProvider.sendResetPasswordOTP(email).then((res) => res.data);
  }

  static async resetPasswordWithOTP(email: string, otp: string, newPassword: string) {
    return await ProfileProvider.resetPasswordWithOTP(email, otp, newPassword).then((res) => res.data);
  }


  static async sendDeleteAccountOTP(email: string) {
    return await ProfileProvider.sendDeleteAccountOTP(email).then((res) => res.data);
  }

  static async deleteAccount(otp: string) {
    return await ProfileProvider.deleteAccount(otp).then((res) => res.data);
  }

  static async adminChangeStatus(email: string, isActive: boolean) {
    return await ProfileProvider.adminChangeStatus(email, isActive).then((res) => res.data);
  }

  static async sendAdminDeleteOTP() {
    return await ProfileProvider.sendAdminDeleteOTP().then((res) => res.data);
  }

  static async adminDeleteUser(userId: string, otp: string) {
    return await ProfileProvider.adminDeleteUser(userId, otp).then((res) => res.data);
  }
}

