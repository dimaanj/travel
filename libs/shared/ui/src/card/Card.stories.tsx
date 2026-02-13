import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Shared UI/Card',
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  args: {
    children: 'Card content goes here.',
    padding: 'md',
  },
};

export const WithSections: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>Card Title</CardHeader>
      <CardBody>
        <p>This is the main body content of the card.</p>
      </CardBody>
      <CardFooter>Footer text or actions</CardFooter>
    </Card>
  ),
  args: {
    padding: 'none',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Clickable card (interactive)',
    interactive: true,
    padding: 'md',
  },
};

export const SmallPadding: Story = {
  args: {
    children: 'Card with small padding',
    padding: 'sm',
  },
};

export const LargePadding: Story = {
  args: {
    children: 'Card with large padding',
    padding: 'lg',
  },
};
