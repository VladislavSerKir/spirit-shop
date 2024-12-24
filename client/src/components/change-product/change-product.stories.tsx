import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import ChangeProduct from "./change-product";

const mockedProductState = {
  products: [
    {
      id: 48,
      description:
        "Aeonium gorgoneum is a species that is rarely foun…that take on a pink tinge in strong light levels.",
      categories: [
        { id: 39, name: "Crassula" },
        { id: 44, name: "Aeonium" },
      ],
      image: "https://i.ibb.co/pymHpNm/aeo-c.png",
      name: "Aeonium gorgoneum",
      price: 6.7,
      favourites: [],
    },
  ],
};

const mockedCategoryState = {
  categories: [
    { id: 36, name: "Cactus" },
    { id: 37, name: "Aloe" },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState: mockedProductState,
  reducers: {},
});

const categorySlice = createSlice({
  name: "category",
  initialState: mockedCategoryState,
  reducers: {},
});

interface IMockstoreProps {
  children: React.ReactNode;
}

const Mockstore = ({ children }: IMockstoreProps) => {
  const store = configureStore({
    reducer: {
      products: productSlice.reducer,
      category: categorySlice.reducer,
    },
    preloadedState: {
      products: mockedProductState,
      category: mockedCategoryState,
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/user/products/48"]}>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

const meta: Meta<typeof ChangeProduct> = {
  title: "uikit/Modals",
  component: ChangeProduct,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: "Функция-обработчик по оверлею",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicChangeProduct: Story = {
  args: { onClose() {} },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
