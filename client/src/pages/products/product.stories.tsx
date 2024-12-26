import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Product from "./product";

const mockedReviewState = [
  {
    id: 1,
    createdAt: "2024-11-25T18:08:21.025Z",
    user: {
      firstName: "Иван",
      lastName: "Иванов",
      email: "test0@mail.ru",
      avatar:
        "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
    },
    rate: 4,
    comment: "Отзыв пользователя",
    product: { id: 2 },
    helpful: [
      { email: "test1@mail.ru" },
      { email: "test2@mail.ru" },
      { email: "test3@mail.ru" },
    ],
  },
];

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
      id: 49,
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
      id: 50,
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

const mockedUserState = {
  userData: {
    avatar:
      "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
    firstName: "Иван",
    lastName: "Иванов",
    email: "test0@mail.ru",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: mockedUserState,
  reducers: {},
});

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

const cartSlice = createSlice({
  name: "cart",
  initialState: mockedUserCartState,
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
      products: productSlice.reducer,
      category: categorySlice.reducer,
      cart: cartSlice.reducer,
      review: reviewSlice.reducer,
    },
    preloadedState: {
      user: mockedUserState,
      products: mockedProductState,
      category: mockedCategoryState,
      cart: mockedUserCartState,
      review: mockedReviewState,
    },
  });

  return (
    <Provider store={store}>
      {" "}
      <MemoryRouter initialEntries={["/products/48"]}>{children}</MemoryRouter>
    </Provider>
  );
};

const meta: Meta<typeof Product> = {
  title: "uikit/Product",
  component: Product,
  tags: ["autodocs"],
  argTypes: {
    productId: {
      description: "Id продукта",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicProduct: Story = {
  parameters: {
    docs: {
      description: {
        story: "Страница продукта",
      },
    },
  },
  args: { productId: "48" },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
