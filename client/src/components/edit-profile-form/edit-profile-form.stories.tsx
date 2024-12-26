import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import EditProfileForm from "./edit-profile-form";

const mockedUserState = {
  userData: {
    avatar:
      "https://i.pinimg.com/1200x/6c/7a/24/6c7a24b64de8eba5ca35f666c2c79d26.jpg",
    firstName: "Иван",
    lastName: "Иванов",
    email: "test0@mail.ru",
  },
};

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
    <MemoryRouter initialEntries={["/user/profile"]}>{children}</MemoryRouter>
  </Provider>
);

const meta: Meta<typeof EditProfileForm> = {
  title: "uikit/Modals",
  component: EditProfileForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicEditProfileForm: Story = {
  args: { onClose() {} },
  decorators: [
    (story) => <Mockstore initialState={mockedUserState}>{story()}</Mockstore>,
  ],
};
