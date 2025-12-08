import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { IUserNew, IUserRequest } from "../Models/ProfileModels";

export const getUserData = async () => {
  return await $axios.get($api("get_user_data"));
};

export const putUserData = async (payload: IUserRequest) => {
  return await $axios.put($api("put_user_data"), payload);
};
export const putUserImage = async (payload: FormData) => {
  return await $axios.put($api("put_user_image"), payload);
};
export const postNewUser = async (payload: IUserNew) => {
  return await $axios.post($api("post_new_user"), payload);
};
