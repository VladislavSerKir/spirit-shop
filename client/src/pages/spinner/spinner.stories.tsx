import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "uikit/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicSpinner: Story = {};
