import type { IUserNew, IUserRequest } from "../Models/ProfileModels";
import * as ProfileProvider from "../Provider/ProfileProvider";

export class ProfileService {
  static async getUserData() {
    return await ProfileProvider.getUserData().then((res) => {
      return {
        ...res.data,
        profileImage: `${import.meta.env.VITE_IMAGE_URL}/${
          res.data.profileImage
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
        profileImage: `${import.meta.env.VITE_IMAGE_URL}/${
          res.data.profileImage
        }`,
      };
    });
  }

  static async addNewUser(payload: IUserNew) {
    return await ProfileProvider.postNewUser(payload).then((res) => {
      return res.data;
    });
  }
}
