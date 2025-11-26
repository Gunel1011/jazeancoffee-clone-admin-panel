interface IEntiponts {
  get_all_products: string;
  get_single_product: string;
  put_product: string;
  login: string;
}

const endpoints: IEntiponts = {
  get_all_products: "/products",
  get_single_product: "/products",
  put_product: "/products",
  login: "/login",
};

const $api = (key: keyof IEntiponts) => {
  return endpoints[key];
};
export default $api;
