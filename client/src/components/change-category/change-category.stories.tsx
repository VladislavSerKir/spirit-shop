import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import ChangeCategory from "./change-category";
import { MemoryRouter } from "react-router-dom";

const mockedCategoryState = {
  categories: [
    { id: 36, name: "Cactus" },
    { id: 37, name: "Aloe" },
  ],
};

interface IMockstoreProps {
  initialState: typeof mockedCategoryState;
  children: React.ReactNode;
}

const Mockstore = ({ initialState, children }: IMockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        category: createSlice({
          name: "category",
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    <MemoryRouter initialEntries={["/user/categories/36"]}>
      {children}
    </MemoryRouter>
  </Provider>
);

const meta: Meta<typeof ChangeCategory> = {
  title: "uikit/Modals",
  component: ChangeCategory,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: "Функция-обработчик по оверлею",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicChangeCategory: Story = {
  args: { onClose() {} },
  decorators: [
    (story) => (
      <Mockstore initialState={mockedCategoryState}>{story()}</Mockstore>
    ),
  ],
};
