import type { Meta, StoryObj } from "@storybook/react";
import MenuAccordeon from "./menu-accordeon";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const mockedAdminState = {
  userData: {
    role: "admin",
  },
};

const mockedUserState = {
  userData: {
    role: "user",
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
    {children}
  </Provider>
);

const meta: Meta<typeof MenuAccordeon> = {
  title: "uikit/Accordeons",
  component: MenuAccordeon,
  tags: ["autodocs"],
  argTypes: {
    location: {
      description: "Объект, содержащий информацию о текущем маршруте.",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUserMenuAccordeon: Story = {
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/user/profile"]}>
        <Mockstore initialState={mockedUserState}>{story()}</Mockstore>
      </MemoryRouter>
    ),
  ],
};

export const BasicAdminMenuAccordeon: Story = {
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/user/profile"]}>
        <Mockstore initialState={mockedAdminState}>{story()}</Mockstore>
      </MemoryRouter>
    ),
  ],
};
