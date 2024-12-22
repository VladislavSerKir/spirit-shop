import type { Meta, StoryObj } from "@storybook/react";
import OrderAccordeon from "./order-accordeon";

const mockedOrderState = {
  id: 1,
  number: 4586754,
  createdAt: "2024-11-25T18:46:13.431Z",
  isNeedPackage: true,
  isNeedDelivery: false,
  comment: "comment",
  purchase: [
    {
      id: 1,
      quantity: 3,
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
    },
    {
      id: 2,
      quantity: 2,
      product: {
        id: 58,
        description:
          "Echinocereus brandegeei is a variable cactus. The stems always grow in clusters, which vary from a few stems to great loose mounds more than 2 m across and less than 35 cm tall. The spines are even more variable.",
        image: "https://i.ibb.co/52Cz6r1/pah2-c.png",
        name: "Sedum burrito",
        price: 42,
        categories: [
          {
            id: 37,
            name: "Category3",
          },
          {
            id: 48,
            name: "Category4",
          },
        ],
      },
    },
  ],
};

const meta: Meta<typeof OrderAccordeon> = {
  title: "uikit/Accordeons",
  component: OrderAccordeon,
  tags: ["autodocs"],
  argTypes: {
    order: {
      description: "Заказ пользователя",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicOrderAccordeon: Story = {
  args: {
    order: mockedOrderState,
  },
  parameters: {
    docs: {
      description: {
        story: "Аккордеон заказа пользователя",
      },
    },
  },
};
