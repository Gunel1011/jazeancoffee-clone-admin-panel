export interface IProduct {
  _id: string;
  name: string;
  details: string;
  price: number;
  productImage: string;
  __v: number;
}

export interface IProductRequest {
  _id?: string;
  name: string;
  details: string;
  price: number;
  productImage?: File;
}
