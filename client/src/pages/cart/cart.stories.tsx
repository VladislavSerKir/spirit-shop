import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./cart";

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

const Mockstore = ({ initialState, children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        cart: createSlice({
          name: "cart",
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof Cart> = {
  title: "uikit/Cart",
  component: Cart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUserCart: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedUserCartState}>{story()}</Mockstore>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Корзина пользователя 2 наименованиями товара",
      },
    },
  },
};
