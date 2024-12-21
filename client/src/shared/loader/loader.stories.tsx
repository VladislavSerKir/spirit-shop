import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./loader";

const meta: Meta<typeof Loader> = {
  title: "uikit/Spinner",
  component: Loader,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicLoader: Story = {};
