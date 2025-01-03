import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MyReviewPage } from "./my-review-page";

const mockedReviewsState = [
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
    product: {
      categories: [],
      description:
        "Lovely year-round blue-green foliage. Needle-like leaves give the appearance of a tiny conifer tree. Blue-gray foliage in early spring and fall becomes blue-green in the summer. The leaves take on purple to pink tones in the late fall and winter. Yellow flowers appear on tall stalks in midsummer.",
      favourites: { id: 25, user: null },
      id: 52,
      image: "https://i.ibb.co/wCL15d2/pah1-c.png",
      name: "Sedum montanum subsp. orientale",
      price: 25.8,
    },
    helpful: [
      { email: "test1@mail.ru" },
      { email: "test2@mail.ru" },
      { email: "test3@mail.ru" },
    ],
  },
  {
    id: 2,
    createdAt: "2024-11-25T18:49:49.851Z",
    user: {
      firstName: "Афоня",
      lastName: "Афонин",
      email: "test3@mail.ru",
      avatar:
        "https://avatars.githubusercontent.com/u/83783362?s=400&u=30352d9dee47d0227205cd830b20c4313a047120&v=4",
    },
    rate: 5,
    comment: "Очень необычные листья!",
    product: {
      categories: [],
      description:
        "This is a dwarf form of the aloes. It reaches a height of 40 cm. However, it must be said that it can reach a height of 4 meters in its home. The 10 to 15 cm long and lanceolate, fleshy leaves are arranged around the trunk like roof tiles. At first they stand upright and as they get older they tend to be curled up. The leaf color is green with irregular, white transverse bands. The first flowers appear with a plant size of 10 to 15 cm. The stem can easily tip over if there are numerous flowers.",
      favourites: { id: 25, user: null },
      id: 57,
      image: "https://i.ibb.co/8P74W90/3-2.png",
      name: "Aloe variegata",
      price: 7.1,
    },
    helpful: [{ email: "test1@mail.ru" }],
  },
  {
    id: 3,
    createdAt: "2024-11-25T19:08:50.480Z",
    user: {
      firstName: "Иван",
      lastName: "Иванов",
      email: "test0@mail.ru",
      avatar:
        "https://i.pinimg.com/736x/ad/82/4c/ad824c23316802b775aec6f210b5c7ca.jpg",
    },
    rate: 3,
    comment: "Очень капризный",
    product: { id: 2 },
    helpful: [],
  },
];

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

const mockedUserState = { userData: { email: "test5@mail.ru" } };

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

const reviewSlice = createSlice({
  name: "review",
  initialState: { review: mockedReviewsState, reviewRequest: false },
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
      review: reviewSlice.reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<typeof MyReviewPage> = {
  title: "uikit/Review",
  component: MyReviewPage,
  tags: ["autodocs"],
  argTypes: {
    reviews: {
      description: "Лента ревью пользователя на продукты",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicMyReviewPage: Story = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  parameters: {
    docs: {
      description: {
        story: "Лента ревью пользователя на продукты",
      },
    },
  },
};
