import type { Meta, StoryObj } from "@storybook/react";
import { NotFound } from "./not-found";

const meta: Meta<typeof NotFound> = {
  title: "uikit/NotFound",
  component: NotFound,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicNotFound: Story = {};
