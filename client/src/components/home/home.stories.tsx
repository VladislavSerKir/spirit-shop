import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "./home";

const meta: Meta<typeof Home> = {
  title: "uikit/Home",
  component: Home,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicHome: Story = {};
