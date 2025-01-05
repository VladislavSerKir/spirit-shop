import type { Meta, StoryObj } from "@storybook/react";
import UserAccordeon from "./user-accordeon";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const mockedUserState = {
  active: true,
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
  hideProfile: false,
};

const mockedState = { active: true };

interface IMockstoreProps {
  initialState: typeof mockedState;
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

const meta: Meta<typeof UserAccordeon> = {
  title: "uikit/Accordeons",
  component: UserAccordeon,
  tags: ["autodocs"],
  argTypes: {
    user: {
      description: "Карточка пользователя",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUserAccordeon: Story = {
  args: {
    user: mockedUserState,
  },
  decorators: [
    (story) => <Mockstore initialState={mockedState}>{story()}</Mockstore>,
  ],
  parameters: {
    docs: {
      description: {
        story: "Аккордеон пользователя",
      },
    },
  },
};
