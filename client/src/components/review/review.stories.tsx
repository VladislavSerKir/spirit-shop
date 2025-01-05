import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Review } from "./review";

const mockedReviewState = {
  id: 1,
  createdAt: "2024-11-25T18:08:21.025Z",
  user: {
    id: 3,
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

const meta: Meta<typeof Review> = {
  title: "uikit/Review",
  component: Review,
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

export const BasicReview: Story = {
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
