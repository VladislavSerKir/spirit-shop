import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Order } from "./order";

const mockedOrderState = {
  id: 1,
  number: 4586754,
  createdAt: "2024-11-25T18:46:13.431Z",
  isNeedPackage: true,
  isNeedDelivery: false,
  comment: "comment",
  purchase: [
    {
      id: 1,
      quantity: 3,
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
      quantity: 2,
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
};

const orderSlice = createSlice({
  name: "order",
  initialState: mockedOrderState,
  reducers: {},
});

interface IMockstoreProps {
  children: React.ReactNode;
}

const Mockstore = ({ children }: IMockstoreProps) => {
  const store = configureStore({
    reducer: {
      order: orderSlice.reducer,
    },
    preloadedState: {
      order: mockedOrderState,
    },
  });

  return (
    <Provider store={store}>
      {" "}
      <MemoryRouter initialEntries={["/user/orders"]}>{children}</MemoryRouter>
    </Provider>
  );
};

const meta: Meta<typeof Order> = {
  title: "uikit/Order",
  component: Order,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicOrder: Story = {
  parameters: {
    docs: {
      description: {
        story: "Страница заказа",
      },
    },
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
