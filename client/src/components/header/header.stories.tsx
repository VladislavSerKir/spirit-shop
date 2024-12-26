import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./header";

const mockedUserState = {
  userData: {
    avatar:
      "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
    firstName: "Иван",
    lastName: "Иванов",
    email: "test0@mail.ru",
  },
};

const mockedUserCartState = {
  cart: {
    id: 7,
    cartItem: [
      {
        id: 1,
        quantity: 7,
        product: {
          id: 53,
          description:
            "Echinocereus brandegeei is a variable cactus. The stems always grow in clusters, which vary from a few stems to great loose mounds more than 2 m across and less than 35 cm tall. The spines are even more variable.",
          image: "https://i.ibb.co/7t6hWQb/2.png",
          name: "Echinocereus brandegeei",
          price: 6,
          categories: [
            {
              id: 36,
              name: "Category1",
            },
            {
              id: 46,
              name: "Category2",
            },
          ],
        },
      },
      {
        id: 2,
        quantity: 7,
        product: {
          id: 58,
          description:
            "Echinocereus brandegeei is a variable cactus. The stems always grow in clusters, which vary from a few stems to great loose mounds more than 2 m across and less than 35 cm tall. The spines are even more variable.",
          image: "https://i.ibb.co/52Cz6r1/pah2-c.png",
          name: "Sedum burrito",
          price: 42,
          categories: [
            {
              id: 37,
              name: "Category3",
            },
            {
              id: 48,
              name: "Category4",
            },
          ],
        },
      },
    ],
  },
  success: true,
  cartRequest: false,
  cartErrorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: mockedUserState,
  reducers: {},
});

const cartSlice = createSlice({
  name: "cart",
  initialState: mockedUserCartState,
  reducers: {},
});

interface IMockstoreProps {
  children: React.ReactNode;
}

const Mockstore = ({ children }: IMockstoreProps) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      cart: cartSlice.reducer,
    },
    preloadedState: {
      user: mockedUserState,
      cart: mockedUserCartState,
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </Provider>
  );
};

const meta: Meta<typeof Header> = {
  title: "uikit/Header",
  component: Header,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicHeader: Story = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
