interface IEntiponts {
  get_all_products: string;
  get_single_product: string;
  get_user_data: string;
  put_product: string;
  post_product: string;
  delete_product: string;
  put_user_data: string;
  login: string;
}

const endpoints: IEntiponts = {
  get_all_products: "/products",
  get_single_product: "/products",
  get_user_data: "/users/profile-data",
  put_product: "/products/",
  put_user_data: "/users/profile-update",
  post_product: "/products/",
  delete_product: "/products/",
  login: "/login",
};

const $api = (key: keyof IEntiponts) => {
  return endpoints[key];
};
export default $api;
