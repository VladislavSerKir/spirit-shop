import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  previewBody: (body) => `
    ${body}
    ${
      process.env.ANALYTICS_ID
        ? '<script src="https://cdn.example.com/analytics.js"></script>'
        : ""
    }
  `,
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-addon-react-router-v5",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
