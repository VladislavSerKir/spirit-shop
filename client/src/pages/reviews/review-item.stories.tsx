import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ReviewItem } from "./review-item";

const mockedReviewState = {
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
};

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

const meta: Meta<typeof ReviewItem> = {
  title: "uikit/Review",
  component: ReviewItem,
  tags: ["autodocs"],
  argTypes: {
    review: {
      description: "Ревью пользователя на продукт",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicReviewItem: Story = {
  args: {
    review: mockedReviewState,
  },
  decorators: [
    (story) => <Mockstore initialState={mockedUserState}>{story()}</Mockstore>,
  ],
  parameters: {
    docs: {
      description: {
        story: "Отзыв пользователя на товар",
      },
    },
  },
};
