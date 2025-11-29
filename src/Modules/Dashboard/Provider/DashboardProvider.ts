import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { IProduct, IProductRequest } from "../Models/DashboardModels";

export const getProducts = async () => {
  return await $axios.get<IProduct[]>($api("get_all_products"));
};

export const getCoffeeDetails = async (id: string) => {
  return $axios.get<IProduct>($api("get_single_product") + `/${id}`);
};

export const putCoffeeDetails = async (
  payload: IProductRequest,
  id: string
) => {
  return $axios.put<IProduct>($api("put_product") + id, payload);
};
