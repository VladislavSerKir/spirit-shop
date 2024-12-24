import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import ProductCard from "./product-card";
import { Router } from "react-router-dom";
import history from "../../utils/history";

const mockedCategoriesProps = [
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
];

const mockedProductProps = {
  categories: [
    { id: 39, name: "Crassula" },
    { id: 44, name: "Aeonium" },
  ],
  description:
    "Aeonium gorgoneum is a species that is rarely found in cultivation. It is not like most Aeonium varieties as it is not from the Canary Islands, instead it grows in the more tropical Cape Verde Islands. It has attractive light green-yellow leaves that take on a pink tinge in strong light levels.",
  favourites: [
    {
      avatar:
        "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
      createdAt: "2024-11-25T18:08:21.025Z",
      email: "test1@mail.ru",
      firstName: "Иван",
      id: 59,
      lastName: "Иванов",
      mobileNumber: "89216365747",
      role: "user",
      favourite: [],
      password: "",
    },
  ],
  id: 48,
  image: "https://i.ibb.co/pymHpNm/aeo-c.png",
  name: "Aeonium gorgoneum",
  price: 6.7,
};

const mockedUserState = { userData: { email: "test5@mail.ru", favourite: [] } };
const mockedCartState = {
  cartItem: [
    {
      id: 18,
      cartItem: [
        {
          id: 365,
          quantity: 3,
          product: {
            id: 365,
            quantity: 3,
            product: {
              id: 48,
              description:
                "Aeonium gorgoneum is a species that is rarely foun…that take on a pink tinge in strong light levels.",
              image: "https://i.ibb.co/pymHpNm/aeo-c.png",
              name: "Aeonium gorgoneum",
              price: 6.7,
            },
          },
        },
      ],
    },
  ],
};
const mockedReviewState = { review: [] };

const userSlice = createSlice({
  name: "user",
  initialState: mockedUserState,
  reducers: {},
});

const cartSlice = createSlice({
  name: "cart",
  initialState: mockedCartState,
  reducers: {},
});

const reviewSlice = createSlice({
  name: "review",
  initialState: mockedReviewState,
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
      review: reviewSlice.reducer,
    },
  });

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const meta: Meta<typeof ProductCard> = {
  title: "uikit/Product",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicProductCard: Story = {
  args: {
    product: mockedProductProps,
    categories: mockedCategoriesProps,
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  parameters: {
    docs: {
      description: {
        story: "Карточка продукта",
      },
    },
  },
};
