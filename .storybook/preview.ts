import type { Preview } from '@storybook/react';
import '../libs/design-system/src/tokens/tokens.css';
import '../libs/design-system/src/base.css';
import '../libs/design-system/src/responsive/responsive.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
