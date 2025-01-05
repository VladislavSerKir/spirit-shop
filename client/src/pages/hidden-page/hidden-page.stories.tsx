import type { Meta, StoryObj } from "@storybook/react";
import { HiddenPage } from "./hidden-page";

const meta: Meta<typeof HiddenPage> = {
  title: "uikit/HiddenPage",
  component: HiddenPage,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicHiddenPage: Story = {};
