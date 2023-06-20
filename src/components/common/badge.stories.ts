import type { Meta, StoryObj } from '@storybook/react';

import Badge from './badge';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Badge> = {
  title: 'SparkUI/Common/Badge',
  component: Badge,
  argTypes: {},
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    status: 'default',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Failed: Story = {
  args: {
    status: 'failed',
  },
};
