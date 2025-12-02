import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { IUserRequest } from "../Models/ProfileModels";

export const getUserData = async () => {
  return await $axios.get($api("get_user_data"));
};

export const putUserData = async (payload: IUserRequest) => {
  return await $axios.put($api("put_user_data"), payload);
};
