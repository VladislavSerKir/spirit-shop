import type { Meta, StoryObj } from "@storybook/react";
import Accordeon from "./accordeon";

const meta: Meta<typeof Accordeon> = {
  title: "uikit/Accordeons",
  component: Accordeon,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Заголовок аккордиона",
      control: {
        type: "text",
      },
    },
    content: {
      description: "Содержимое",
      control: {
        type: "text",
      },
    },
    categories: {
      description: "Массив категорий",
      control: {
        type: "object",
      },
    },
    onCategorySelected: {
      description: "Обработчик выбора категории",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAccordeon: Story = {
  args: {
    title: "Категории",
    categories: [
      { name: "Category1", id: 1 },
      { name: "Category2", id: 2 },
      { name: "Category3", id: 3 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Аккордион с категориями",
      },
    },
  },
};
