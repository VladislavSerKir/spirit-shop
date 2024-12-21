import type { Meta, StoryObj } from "@storybook/react";
import { ModalOverlay } from "./modal-overlay";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const mockedUserStateFalse = {
  isFadingOut: false,
};

const mockedUserStateTrue = {
  isFadingOut: true,
};

const Mockstore = ({ initialState, children }: Record<any, any>) => (
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

const meta: Meta<typeof ModalOverlay> = {
  title: "uikit/ModalOverlay",
  component: ModalOverlay,
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "Функция-обработчик по оверлею",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicModalOverlayFalse: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedUserStateFalse}>{story()}</Mockstore>
    ),
  ],
};

export const BasicModalOverlayTrue: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedUserStateTrue}>{story()}</Mockstore>
    ),
  ],
};
