import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  title: "uikit/Buttons",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    buttonStyle: {
      description: "Стиль кнопки",
      control: {
        type: "text",
      },
    },
    buttonType: {
      description: "Тип кнопки",
      control: {
        type: "text",
      },
    },
    textContent: {
      description: "Содержимое",
      control: {
        type: "text",
      },
    },
    to: {
      description: "Ссылка",
      control: {
        type: "text",
      },
    },
    buttonHandler: {
      description: "Обработчик кнопки",
      control: {
        type: "object",
      },
    },
    fixed: {
      description: "Фиксируемая ширина",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAddButton: Story = {
  args: {
    buttonStyle: "add",
    buttonType: "submit",
    textContent: "Add",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычная кнопка добавить",
      },
    },
  },
};

export const DefaultAddButtonWithoutText: Story = {
  args: {
    buttonStyle: "add",
    buttonType: "submit",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычная кнопка добавить без текста",
      },
    },
  },
};

export const DefaultEditButton: Story = {
  args: {
    buttonStyle: "edit",
    buttonType: "submit",
    textContent: "Edit",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычная кнопка редактировать",
      },
    },
  },
};

export const DefaultShowButton: Story = {
  args: {
    buttonStyle: "arrow-down",
    buttonType: "submit",
    textContent: "Show",
  },
  parameters: {
    docs: {
      description: {
        story: "Обычная кнопка редактировать",
      },
    },
  },
};

export const DefaultBuyButton: Story = {
  args: {
    buttonStyle: "cart",
    buttonType: "submit",
    textContent: "Buy",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка купить",
      },
    },
  },
};

export const DefaultClearButton: Story = {
  args: {
    buttonStyle: "close",
    buttonType: "submit",
    textContent: "Clear",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка очищения",
      },
    },
  },
};

export const DefaultToggleButton: Story = {
  args: {
    buttonStyle: "toggle",
    buttonType: "submit",
    textContent: "Toggle",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка смены типа",
      },
    },
  },
};

export const DefaultLoginYandexButton: Story = {
  args: {
    buttonStyle: "yandex",
    buttonType: "submit",
    textContent: "Login via Yandex",
  },
  parameters: {
    docs: {
      description: {
        story: "Аутентификация чарез Яндекс",
      },
    },
  },
};

export const DefaultLoginGoogleButton: Story = {
  args: {
    buttonStyle: "google",
    buttonType: "submit",
    textContent: "Login via Google",
  },
  parameters: {
    docs: {
      description: {
        story: "Аутентификация чарез Google",
      },
    },
  },
};
