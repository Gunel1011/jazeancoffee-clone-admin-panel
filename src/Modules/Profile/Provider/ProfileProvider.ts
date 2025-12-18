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


export const changeUserRole = async (user_id: string, role: string) => {
  return await $axios.post($api("change_role"), { user_id, role });
};


export const changePassword = async (oldPassword: string, newPassword: string) => {
  return await $axios.post($api("change_password"), { oldPassword, newPassword });
};

export const sendResetPasswordOTP = async (email: string) => {
  return await $axios.post($api("send_reset_password_otp"), { email });
};

export const resetPasswordWithOTP = async (email: string, otp: string, newPassword: string) => {
  return await $axios.post($api("change_password"), { email, otp, newPassword });
};


export const sendDeleteAccountOTP = async (email: string) => {
  return await $axios.post($api("send_delete_account_otp"), { email });
};

export const deleteAccount = async (otp: string) => {
  return await $axios.post($api("delete_account"), { otp });
};


export const adminChangeStatus = async (email: string, isActive: boolean) => {
  return await $axios.post($api("admin_status_change"), { email, isActive });
};


export const sendAdminDeleteOTP = async () => {
  return await $axios.post($api("admin_send_delete_otp"));
};

export const adminDeleteUser = async (userId: string, otp: string) => {
  return await $axios.post($api("admin_delete_user"), { userId, otp });
};
