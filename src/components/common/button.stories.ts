import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'SparkUI/Button',
  component: Button,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'contained',
    size: 'medium',
    label: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    label: 'Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'medium',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'contained',
    size: 'small',
    label: 'Small',
  },
};

export const Large: Story = {
  args: {
    variant: 'contained',
    size: 'large',
    label: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    size: 'medium',
    label: 'Disabled',
    disabled: true
  },
};
