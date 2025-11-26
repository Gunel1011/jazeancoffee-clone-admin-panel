import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { IProduct } from "../Models/DashboardModels";

export const getProducts = async () => {
  return $axios.get<IProduct[]>($api("get_all_products"));
};

export const getProductDetails = async (id: string) => {
  return $axios.get<IProduct>(`${$api("get_single_product")}/${id}`);
};
