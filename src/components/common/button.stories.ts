import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'SparkUI/Common/Button',
  component: Button,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'contained',
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    children: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    children: 'Disabled',
    disabled: true
  },
};
