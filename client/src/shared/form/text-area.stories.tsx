import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "uikit/FormAndFields",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Лейбл поля",
      control: {
        type: "text",
      },
    },
    type: {
      description: "Тип поля",
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
    value: {
      description: "Значение поля",
      control: {
        type: "text",
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

export const DefaultTextAreaField: Story = {
  args: {
    label: "Text",
    type: "",
    name: "text",
    value: "Some text",
    onChange: () => {},
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычное текстовое поле",
      },
    },
  },
};

export const DefaultTextAreaFieldWithError: Story = {
  args: {
    label: "Text",
    type: "",
    name: "text",
    value:
      "Echinocactus grusonii has usually a single slowly growing globe-shaped stem that became elongated (barrel-shaped) in maturity, up to 90 cm (180 cm) in height and spread. It may offset with advanced age and a few multiples occur even at small sizes. Its stem is pale green and heavily ribbed.",
    onChange: () => {},
    error: "Слишком длинное описание",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычное текстовое поле с ошибкой валидации",
      },
    },
  },
};
