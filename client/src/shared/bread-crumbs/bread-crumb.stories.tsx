import type { Meta, StoryObj } from "@storybook/react";
import BreadCrumb from "./bread-crumb";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import RightArrow from "../../components/right-arrow/right-arrow";

const mockedState = {
  pathname: "",
  codeSent: false,
  resetEmail: "",
  resetPassword: false,
};

const Mockstore = ({ initialState, children }: Record<any, any>) => (
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

const meta: Meta<typeof BreadCrumb> = {
  title: "uikit/BreadCrumbs",
  component: BreadCrumb,
  tags: ["autodocs"],
  argTypes: {
    routeName: {
      description: "Имя маршрута",
    },
    index: {
      description: "Индекс",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithRightArrow: Story = {
  args: {
    routeName: "",
    index: 1,
  },
  decorators: [
    (story) => <Mockstore initialState={mockedState}>{story()}</Mockstore>,
  ],
  render: (args) => (
    <BreadCrumb {...args}>
      <RightArrow color="black" size={25} />
    </BreadCrumb>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Этот компонент BreadCrumb отображает иконку RightArrow, указывающую на следующий маршрут.",
      },
    },
  },
};
