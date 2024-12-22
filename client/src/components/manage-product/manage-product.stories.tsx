import type { Meta, StoryObj } from "@storybook/react";
import ManageProduct from "./manage-product";

const meta: Meta<typeof ManageProduct> = {
  title: "uikit/ManageForms",
  component: ManageProduct,
  tags: ["autodocs"],
  argTypes: {
    order: {
      description: "Форма управления продуктами",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicManageProductForm: Story = {
  parameters: {
    docs: {
      description: {
        story: "Форма управления продуктами",
      },
    },
  },
};
