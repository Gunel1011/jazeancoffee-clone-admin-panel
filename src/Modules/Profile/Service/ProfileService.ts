import type { IUserRequest } from "../Models/ProfileModels";
import * as ProfileProvider from "../Provider/ProfileProvider";

export class ProfileService {
  static async getUserData() {
    return await ProfileProvider.getUserData().then((res) => {
      return {
        ...res.data,
        fullName: res.data.name + " " + res.data.surname,
      };
    });
  }
  static async editUserData(payload: IUserRequest) {
    return await ProfileProvider.putUserData(payload).then((res) => {
      return res.data;
    });
  }
}
