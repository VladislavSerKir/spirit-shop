export type TProductData = {
  products: Array<IProductWithCategories>;
  categories: Array<ICategory>;
  success: boolean;
  productsRequest: boolean;
  categoriesRequest: boolean;
  productsErrorMessage: null | undefined | string;
  categoriesErrorMessage: null | undefined | string;
};

export interface IProduct {
  id: number;
  categories: string[];
  description: string;
  image: string;
  name: string;
  price: number;
  favourites: any;
}

export interface ICartParams {
  comment: string;
  isNeedDelivery: boolean;
  isNeedPackage: boolean;
}

export interface IProductWithCategories {
  id: number;
  categories: ICategory[];
  description: string;
  image: string;
  name: string;
  price: number;
}

export interface ICreateProduct {
  categories: string[];
  description: string;
  image: string;
  name: string;
  price: string;
  id?: number;
}

export interface ICreateCategory {
  name: string;
}

export interface IRemoveProduct {
  id: number;
}

export interface IRemoveCategory {
  id: number;
}

export interface ICategory {
  id: number;
  name: string;
}
