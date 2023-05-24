import type { Meta, StoryObj } from '@storybook/react';

import Notification from './notification';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Notification> = {
  title: 'SparkUI/Common/Notification',
  component: Notification,
  argTypes: {},
  args: {
    message: 'Token Amount has been changed',
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

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
