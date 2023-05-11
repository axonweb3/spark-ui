import type { Meta, StoryObj } from '@storybook/react';

import Alert from './alert';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Alert> = {
  title: 'SparkUI/Common/Alert',
  component: Alert,
  argTypes: {},
  args: {
    message: 'Token Amount has been changed',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    status: 'info',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};
