import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter, Router } from "react-router-dom";
import history from "../../utils/history";
import ManageCategories from "./manage-categories";

const mockedCategoryState = {
  categories: [
    { id: 36, name: "Cactus" },
    { id: 37, name: "Aloe" },
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
  });

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const meta: Meta<typeof ManageCategories> = {
  title: "uikit/ManageCategories",
  component: ManageCategories,
  tags: ["autodocs"],
  argTypes: {
    location: {
      description: "Объект, содержащий информацию о текущем маршруте.",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicManageCategoriesPage: Story = {
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/user/categories"]}>
        <Mockstore>{story()}</Mockstore>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Карточка продукта",
      },
    },
  },
};
