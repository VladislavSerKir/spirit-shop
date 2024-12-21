import type { Meta, StoryObj } from "@storybook/react";
import { About } from "./about";

const meta: Meta<typeof About> = {
  title: "uikit/About",
  component: About,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicAbout: Story = {};
