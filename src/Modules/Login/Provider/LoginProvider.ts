import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { ILoginRequest, ILoginResponse } from "../Models/LoginModels";

export const postLogin = async (payload: ILoginRequest) => {
  return await $axios.post<ILoginResponse>($api("login"), payload);
};
