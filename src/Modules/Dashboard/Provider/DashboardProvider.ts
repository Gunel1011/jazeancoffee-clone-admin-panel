import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";
import type { IProduct } from "../Models/DashboardModels";

export const getProducts = async () => {
  return await $axios.get<IProduct[]>($api("get_all_products"));
};

export const getCoffeeDetails = async (id: string) => {
  return $axios.get<IProduct>($api("get_single_product") + `/${id}`);
};

export const putCoffeeDetails = async (payload: FormData, id: string) => {
  return $axios.put<IProduct>($api("put_product") + id, payload);
};

export const postNewCoffee = async (payload: FormData) => {
  return $axios.post<IProduct>($api("post_product"), payload);
};

export const deleteCoffee = async (id: string) => {
  return $axios.delete($api("delete_product") + id);
};
