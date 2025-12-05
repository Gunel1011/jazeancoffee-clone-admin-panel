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
        productImage:
          import.meta.env.VITE_IMAGE_URL + "/" + res.data.productImage,
      };
    });
  }

  static async editCoffee(payload: FormData, id: string) {
    return await ShopProvider.putCoffeeDetails(payload, id).then((res) => {
      return res.data;
    });
  }

  static async addNewCoffee(payload: FormData) {
    return await ShopProvider.postNewCoffee(payload).then((res) => {
      return res.data;
    });
  }

  static async removeNewCoffee(id: string) {
    return await ShopProvider.deleteCoffee(id).then((res) => {
      return res.data;
    });
  }
}
