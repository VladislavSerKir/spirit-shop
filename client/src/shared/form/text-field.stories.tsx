import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "uikit/FormAndFields",
  component: TextField,
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
    type_phone: {
      description: "Тип поля телефон",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextField: Story = {
  args: {
    label: "Name",
    type: "",
    name: "name",
    value: "Vladislav",
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

export const DefaultPhoneField: Story = {
  args: {
    label: "Phone",
    type: "",
    name: "mobileNumber",
    value: "",
    onChange: () => {},
    error: "",
    type_phone: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Поле ввода телефона",
      },
    },
  },
};

export const DefaultNumberField: Story = {
  args: {
    label: "Count",
    type: "number",
    name: "mobileNumber",
    value: "",
    onChange: () => {},
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Цифровое поле ввода",
      },
    },
  },
};

export const DefaultPasswordField: Story = {
  args: {
    label: "Password",
    type: "password",
    name: "password",
    value: "password",
    onChange: () => {},
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Поле ввода пароля",
      },
    },
  },
};

export const DefaultTextFieldWithError: Story = {
  args: {
    label: "Name",
    type: "",
    name: "name",
    value: "V",
    onChange: () => {},
    error: "Слишком короткое имя",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычное текстовое поле с ошибкой валидации",
      },
    },
  },
};
