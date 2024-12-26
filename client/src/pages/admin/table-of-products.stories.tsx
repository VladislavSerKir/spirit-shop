import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import TableOfProducts from "./table-of-products";

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
      favourites: { id: 18, user: [{ id: "2" }] },
    },
    {
      id: 48,
      description:
        "Sedum burrito or Donkey's Tail is a perennial, evergreen, pendent succulent with many long hanging stems up to 10 inches (1 m) long and fleshy blue-green leaves. It is related to Sedum morganianum, but has smaller and more compact, spherical and shorter leaves.",
      categories: [
        { id: 39, name: "Crassula" },
        { id: 45, name: "Sedum" },
      ],
      image: "https://i.ibb.co/52Cz6r1/pah2-c.png",
      name: "Sedum burrito",
      price: 17.2,
      favourites: { id: 18, user: [{ id: "2" }] },
    },
    {
      id: 48,
      description:
        "Echeveria ‘Doris Taylor’, or Woolly Rose, is an open rosette with very fuzzy leaves coated with a thick layer of cilia. It is bright apple green with small red leaf tips when grown in bright sun. Woolly Rose offsets readily and forms nice large clumps. This Echeveria is a hybrid of Echeveria pulvinata and Echeveria setosa.",
      categories: [
        { id: 39, name: "Crassula" },
        { id: 34, name: "Echeveria" },
      ],
      image: "https://i.ibb.co/fdXn1qQ/eh2-c.png",
      name: "Echeveria ‘Doris Taylor’",
      price: 12.6,
      favourites: { id: 18, user: [{ id: "2" }] },
    },
  ],
};

const mockedCategoryState = {
  categories: [
    { id: 36, name: "Cactus" },
    { id: 37, name: "Aloe" },
    { id: 38, name: "Echinocactus" },
    { id: 39, name: "Crassula" },
    { id: 40, name: "Asphodelaceae" },
    { id: 41, name: "Pilosocereus" },
    { id: 42, name: "Haworthia" },
    { id: 43, name: "Opuntia" },
    { id: 44, name: "Aeonium" },
    { id: 45, name: "Sedum" },
    { id: 46, name: "Echinocereus" },
    { id: 33, name: "Liliaceae" },
    { id: 34, name: "Echeveria" },
    { id: 35, name: "Pachyphytum" },
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
      {" "}
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </Provider>
  );
};

const meta: Meta<typeof TableOfProducts> = {
  title: "uikit/ManageForms",
  component: TableOfProducts,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicTableOfProducts: Story = {
  parameters: {
    docs: {
      description: {
        story: "Таблица продуктов в админской панели",
      },
    },
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
