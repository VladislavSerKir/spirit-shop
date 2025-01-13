import type { Meta, StoryObj } from "@storybook/react";
import BlurCircles from "./blur-circles";

const meta: Meta<typeof BlurCircles> = {
  title: "uikit/BlurCircles",
  component: BlurCircles,
  tags: ["autodocs"],
  argTypes: {
    circles: {
      description: "Количество кругов",
    },
    width: {
      description: "Ширина площади отображения",
    },
    height: {
      description: "Высота площади отображения",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const circlesProps = [
  { size: 35, color: "rgba(255, 0, 0, 0.7)", blur: 60 },
  { size: 35, color: "rgba(0, 255, 0, 0.7)", blur: 60 },
  { size: 35, color: "rgba(255, 252, 49, 0.7)", blur: 60 },
];

export const DefaultCircles: Story = {
  args: {
    circles: circlesProps,
    width: 200,
    height: 200,
  },
};

const circlesPropsBig = [
  { size: 70, color: "rgba(255, 0, 0, 0.7)", blur: 70 },
  { size: 70, color: "rgba(0, 255, 0, 0.7)", blur: 70 },
  { size: 70, color: "rgba(255, 252, 49, 0.7)", blur: 70 },
];

export const DefaultCirclesBig: Story = {
  args: {
    circles: circlesPropsBig,
    width: 400,
    height: 400,
  },
};
