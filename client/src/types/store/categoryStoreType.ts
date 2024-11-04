export type ICategoryState = {
  categories: Array<ICategory>;
  success: boolean;
  categoriesRequest: boolean;
  categoriesErrorMessage: null | undefined | string;
};

export interface ICreateCategory {
  name: string;
}

export interface IRemoveCategory {
  id: number;
}

export interface ICategory {
  id: number;
  name: string;
}
