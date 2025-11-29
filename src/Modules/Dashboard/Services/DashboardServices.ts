import type { IProductRequest } from "../Models/DashboardModels";
import * as ShopProvider from "../Provider/DashboardProvider";
export class ShopService {
  static async productList() {
    return await ShopProvider.getProducts().then((res) => {
      return res.data.map((item) => ({
        ...item,
        productImage: `${import.meta.env.VITE_IMAGE_URL}/${item.productImage}`,
      }));
    });
  }
  static async coffeeDetails(id: string) {
    return await ShopProvider.getCoffeeDetails(id).then((res) => {
      return {
        ...res.data,
        productImage: import.meta.env.VITE_IMAGE_URL + res.data.productImage,
      };
    });
  }

  static async editCoffee(payload: IProductRequest, id: string) {
    return await ShopProvider.putCoffeeDetails(payload, id).then((res) => {
      return res.data;
    });
  }
}
