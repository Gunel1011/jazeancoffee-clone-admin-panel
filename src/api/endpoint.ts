interface IEntiponts {
  get_all_products: string;
  get_single_product: string;
  get_user_data: string;
  get_all_user_list: string;
  put_product: string;
  post_product: string;
  delete_product: string;
  put_user_data: string;
  put_user_image: string;
  post_new_user: string;
  login: string;
  change_role: string;
  change_password: string;
  delete_account: string;
  send_delete_account_otp: string;
  admin_status_change: string;
  admin_delete_user: string;
  admin_send_delete_otp: string;
  send_reset_password_otp: string;
}

const endpoints: IEntiponts = {
  get_all_products: "/products",
  get_single_product: "/products",
  get_user_data: "/users/profile-data",
  get_all_user_list: "/users/get-all-users",
  put_product: "/products/",
  put_user_image: "/users/profile/",
  put_user_data: "/users/profile-update",
  post_product: "/products/",
  post_new_user: "/register",
  delete_product: "/products/",
  login: "/login",
  change_role: "/users/change-role",
  change_password: "/users/change-password",
  delete_account: "/users/delete-account",
  send_delete_account_otp: "/users/send-delete-account-otp",
  admin_status_change: "/users/admin-status-change",
  admin_delete_user: "/users/admin-delete-user",
  admin_send_delete_otp: "/users/admin-send-delete-otp",
  send_reset_password_otp: "/users/send-reset-password-otp",
};

const $api = (key: keyof IEntiponts) => {
  return endpoints[key];
};
export default $api;
