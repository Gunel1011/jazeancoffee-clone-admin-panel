import type { ILoginRequest } from "../Models/LoginModels";
import * as LoginProvider from "../Provider/LoginProvider";
export class LoginService {
  static async login(payload: ILoginRequest) {
    return await LoginProvider.postLogin(payload).then((res) => {
      localStorage.setItem("token", res.data.token);
      return res.data;
    });
  }
}
