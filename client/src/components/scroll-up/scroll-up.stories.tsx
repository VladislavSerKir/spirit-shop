import type { Meta, StoryObj } from "@storybook/react";
import { ScrollUp } from "./scroll-up";

const meta: Meta<typeof ScrollUp> = {
  title: "uikit/ScrollUp",
  component: ScrollUp,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Кнопка скроллинга наверх",
      },
    },
  },
};
