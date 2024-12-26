import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import TableOfCategories from "./table-of-categories";

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
      category: categorySlice.reducer,
    },
    preloadedState: {
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

const meta: Meta<typeof TableOfCategories> = {
  title: "uikit/ManageForms",
  component: TableOfCategories,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicTableOfCategories: Story = {
  parameters: {
    docs: {
      description: {
        story: "Таблица категорий в админской панели",
      },
    },
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
