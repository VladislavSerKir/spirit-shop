import type { Meta, StoryObj } from "@storybook/react";
import MultiSelectField from "./multi-select-field";

const mockedCategoryProps = [
  { value: 36, label: "Cactus" },
  { value: 37, label: "Aloe" },
  { value: 38, label: "Echinocactus" },
];

const meta: Meta<typeof MultiSelectField> = {
  title: "uikit/FormAndFields",
  component: MultiSelectField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Лейбл поля",
      control: {
        type: "text",
      },
    },
    name: {
      description: "Имя поля",
      control: {
        type: "text",
      },
    },
    options: {
      description: "Значение поля",
      control: {
        type: "object",
      },
    },
    onChange: {
      description: "Обработчик перехода на предыдущую страницу",
      control: {
        type: "object",
      },
    },
    error: {
      description: "Текст ошибки валидации формы",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultMultiSelectFieldDown: Story = {
  args: {
    label: "Categories",
    name: "categories",
    options: mockedCategoryProps,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Дропдаун категорий вниз",
      },
    },
  },
};

export const DefaultMultiSelectFieldUp: Story = {
  args: {
    label: "Categories",
    name: "categories",
    options: mockedCategoryProps,
    onChange: () => {},
    toTop: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Дропдаун категорий вверх",
      },
    },
  },
};
