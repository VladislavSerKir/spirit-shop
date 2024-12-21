import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from "./steps";

const meta: Meta<typeof Steps> = {
  title: "uikit/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicSteps: Story = {};
