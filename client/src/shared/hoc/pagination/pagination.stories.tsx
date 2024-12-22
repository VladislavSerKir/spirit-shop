import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "uikit/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    maxPage: {
      description: "Суммарное количество отображаемых страниц",
      control: {
        type: "number",
      },
    },
    currentPage: {
      description: "Текущая страница",
      control: {
        type: "number",
      },
    },
    jump: {
      description: "Обработчик перехода на любую страницу",
      control: {
        type: "object",
      },
    },
    next: {
      description: "Обработчик перехода на следующую страницу",
      control: {
        type: "object",
      },
    },
    prev: {
      description: "Обработчик перехода на предыдущую страницу",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPagination: Story = {
  args: {
    maxPage: 1,
    currentPage: 1,
    next: (currentPage: number) => currentPage + 1,
    prev: (currentPage: number) => currentPage - 1,
  },
  parameters: {
    docs: {
      description: {
        story: "Пагинация с одной страницей",
      },
    },
  },
};

export const CurrentPagePagination: Story = {
  args: {
    maxPage: 5,
    currentPage: 4,
    next: (currentPage: number) => currentPage + 1,
    prev: (currentPage: number) => currentPage - 1,
    jump: (currentPage: number) => currentPage,
  },
  parameters: {
    docs: {
      description: {
        story: "Пагинация 4 из 5 страниц",
      },
    },
  },
};
