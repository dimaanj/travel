import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../libs/shared/ui/src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@org/design-system': path.resolve(__dirname, '../libs/design-system/src/index.ts'),
      '@org/design-system/styles': path.resolve(__dirname, '../libs/design-system/src/styles.ts'),
      '@org/shared-ui': path.resolve(__dirname, '../libs/shared/ui/src/index.ts'),
    };
    return config;
  },
};

export default config;
