import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./modal";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ChangeCategory from "../../components/change-category/change-category";

const handleCloseModals = () => {};

const mockedUserState = {
  userData: {
    avatar:
      "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
    firstName: "Иван",
    lastName: "Иванов",
    email: "test0@mail.ru",
    role: "user",
    favourite: [],
  },
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

const userSlice = createSlice({
  name: "user",
  initialState: mockedUserState,
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
      user: userSlice.reducer,
      category: categorySlice.reducer,
    },
    preloadedState: {
      user: mockedUserState,
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

const meta: Meta<typeof Modal> = {
  title: "uikit/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Компонент в модалке",
      control: {
        type: "object",
      },
    },
    onClose: {
      description: "Обработчик Закрытия модалки",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultModal: Story = {
  args: {
    children: <ChangeCategory onClose={handleCloseModals} />,
    onClose: () => {},
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  parameters: {
    docs: {
      description: {
        story: "Модальное окно",
      },
    },
  },
};
