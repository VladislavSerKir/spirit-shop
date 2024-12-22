import type { Meta, StoryObj } from "@storybook/react";
import CartItem from "./cart-item";

const meta: Meta<typeof CartItem> = {
  title: "uikit/Cart",
  component: CartItem,
  tags: ["autodocs"],
  argTypes: {
    product: {
      description: "Продукт, отображаемый в корзине",
      control: {
        type: "object",
      },
    },
    amount: {
      description: "Количество к покупке",
      control: {
        type: "number",
      },
    },
    onIncrement: {
      description: "Обработчик увеличения продукта в корзине",
      control: {
        type: "object",
      },
    },
    onDecrement: {
      description: "Обработчик уменьшения продукта в корзине",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCartItem: Story = {
  args: {
    product: {
      id: 53,
      description:
        "Echinocereus brandegeei is a variable cactus. The stems always grow in clusters, which vary from a few stems to great loose mounds more than 2 m across and less than 35 cm tall. The spines are even more variable.",
      image: "https://i.ibb.co/7t6hWQb/2.png",
      name: "Echinocereus brandegeei",
      price: 6,
      categories: [
        {
          id: 36,
          name: "Category1",
        },
        {
          id: 46,
          name: "Category2",
        },
      ],
    },
    amount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: "Элемент корзины с количеством",
      },
    },
  },
};
