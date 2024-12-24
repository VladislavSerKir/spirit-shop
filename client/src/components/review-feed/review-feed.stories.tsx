import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ReviewFeed } from "./review-feed";

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
    product: { id: 2 },
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
    product: { id: 2 },
    helpful: [
      { email: "test1@mail.ru" },
      { email: "test2@mail.ru" },
      { email: "test5@mail.ru" },
    ],
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

const mockedUserState = { userData: { email: "test5@mail.ru" } };

interface IMockstoreProps {
  initialState: typeof mockedUserState;
  children: React.ReactNode;
}

const Mockstore = ({ initialState, children }: IMockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createSlice({
          name: "user",
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof ReviewFeed> = {
  title: "uikit/Review",
  component: ReviewFeed,
  tags: ["autodocs"],
  argTypes: {
    reviews: {
      description: "Лента ревью пользователей на продукт",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicReviewFeed: Story = {
  args: {
    reviews: mockedReviewsState,
  },
  decorators: [
    (story) => <Mockstore initialState={mockedUserState}>{story()}</Mockstore>,
  ],
  parameters: {
    docs: {
      description: {
        story: "Лента ревью пользователей на продукт",
      },
    },
  },
};
