import type { Meta, StoryObj } from "@storybook/react";
import AppLoader from "./app-loader";

const meta: Meta<typeof AppLoader> = {
  title: "uikit/AppLoader",
  component: AppLoader,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicAppLoader: Story = {};
