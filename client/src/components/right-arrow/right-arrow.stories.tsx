import type { Meta, StoryObj } from "@storybook/react";
import RightArrow from "./right-arrow";

const meta: Meta<typeof RightArrow> = {
  title: "uikit/RightArrow",
  component: RightArrow,
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "Цвет стрелки",
    },
    size: {
      description: "Размер стрелки",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "black",
    size: 25,
  },
};

export const Custom: Story = {
  args: {
    color: "var(--first-color)",
    size: 30,
  },
};
