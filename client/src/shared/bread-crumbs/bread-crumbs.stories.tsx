import type { Meta, StoryObj } from "@storybook/react";
import BreadCrumbs from "./bread-crumbs";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

const mockedHomeState = {
  pathname: "/",
  codeSent: false,
  resetEmail: "",
  resetPassword: false,
};

const mockedProductState = {
  pathname: "/products/53",
  codeSent: false,
  resetEmail: "",
  resetPassword: false,
};

interface IMockstoreProps {
  initialState: typeof mockedHomeState;
  children: React.ReactNode;
}

const Mockstore = ({ initialState, children }: IMockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        service: createSlice({
          name: "service",
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof BreadCrumbs> = {
  title: "uikit/BreadCrumbs",
  component: BreadCrumbs,
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

export const HomePage: Story = {
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Mockstore initialState={mockedHomeState}>{story()}</Mockstore>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Этот компонент BreadCrumbs отображает маршрут /",
      },
    },
  },
};

export const HomeProductPage: Story = {
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/products/53"]}>
        <Mockstore initialState={mockedProductState}>{story()}</Mockstore>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Этот компонент BreadCrumbs отображает маршрут /products/53",
      },
    },
  },
};
