import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import EditReview from "./edit-review";
import { MemoryRouter } from "react-router-dom";

const mockedReviewState = {
  id: "1",
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

interface IMockstoreProps {
  initialState: typeof mockedReviewState;
  children: React.ReactNode;
}

const Mockstore = ({ initialState, children }: IMockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        review: createSlice({
          name: "review",
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    <MemoryRouter initialEntries={["/user/reviews/1"]}>{children}</MemoryRouter>
  </Provider>
);

const meta: Meta<typeof EditReview> = {
  title: "uikit/Modals",
  component: EditReview,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: "Функция-обработчик по оверлею",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicEditReview: Story = {
  args: { onClose() {} },
  decorators: [
    (story) => (
      <Mockstore initialState={mockedReviewState}>{story()}</Mockstore>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Форма редактирования моего ревью на продукт",
      },
    },
  },
};
