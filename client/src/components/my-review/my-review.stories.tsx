import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import MyReview from "./my-review";
import { IReview } from "../../types/store/reviewStoreType";

const mockedReviewState: IReview[] = [
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

const mockedUserState = { user: { userData: { email: "test5@mail.ru" } } };

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

const meta: Meta<typeof MyReview> = {
  title: "uikit/Review",
  component: MyReview,
  tags: ["autodocs"],
  argTypes: {
    review: {
      description: "Значения моего текущего ревью",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicMyReview: Story = {
  args: {
    review: mockedReviewState,
  },
  decorators: [
    (story) => <Mockstore initialState={mockedUserState}>{story()}</Mockstore>,
  ],
  parameters: {
    docs: {
      description: {
        story: "Форма отправки моего ревью",
      },
    },
  },
};
