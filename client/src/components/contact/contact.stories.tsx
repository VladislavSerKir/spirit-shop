import type { Meta, StoryObj } from "@storybook/react";
import { Contact } from "./contact";

const meta: Meta<typeof Contact> = {
  title: "uikit/Contact",
  component: Contact,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicContact: Story = {};
