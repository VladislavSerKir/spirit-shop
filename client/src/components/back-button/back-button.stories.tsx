import type { Meta, StoryObj } from "@storybook/react";
import { BackButton } from "./back-button";

const meta: Meta<typeof BackButton> = {
  title: "uikit/BackButton",
  component: BackButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBackButton: Story = {
  parameters: {
    docs: {
      description: {
        story: "Кнопка назад",
      },
    },
  },
};
