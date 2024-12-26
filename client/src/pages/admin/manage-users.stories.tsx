import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ManageUsers } from "./manage-users";

const mockedUserState = {
  users: {
    allUsersData: [
      {
        active: true,
        avatar: "https://i.pravatar.cc/3001",
        createdAt: "2024-12-01T17:36:24.185Z",
        email: "kireev.vladislav@yandex.ru",
        firstName: "Владислав",
        id: 72,
        lastName: "Киреев",
        mobileNumber: "+7 (921) 636-57-47",
        role: "user",
      },
    ],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: mockedUserState,
  reducers: {},
});

interface IMockstoreProps {
  children: React.ReactNode;
}

const Mockstore = ({ children }: IMockstoreProps) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: mockedUserState,
    },
  });

  return <Provider store={store}> {children}</Provider>;
};

const meta: Meta<typeof ManageUsers> = {
  title: "uikit/ManageForms",
  component: ManageUsers,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicManageUsers: Story = {
  parameters: {
    docs: {
      description: {
        story: "Список пользователей в админской панели",
      },
    },
  },
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};
