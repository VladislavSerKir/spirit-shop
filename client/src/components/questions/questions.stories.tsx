import type { Meta, StoryObj } from "@storybook/react";
import { Questions } from "./questions";

const meta: Meta<typeof Questions> = {
  title: "uikit/Questions",
  component: Questions,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicQuestions: Story = {};
