import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Shared UI/Typography',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'body1',
        'body2',
        'caption',
        'label',
        'code',
      ],
    },
    muted: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body text (body1) is used for main content.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body2 is slightly smaller for secondary content.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption or helper text',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Label',
  },
};

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'const x = 42;',
  },
};

export const Muted: Story = {
  args: {
    variant: 'body1',
    children: 'Muted text for less emphasis.',
    muted: true,
  },
};
