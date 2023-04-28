import type { Meta, StoryObj } from '@storybook/react';

import { Snackbar } from './snackbar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Snackbar> = {
  title: 'SparkUI/Snackbar',
  component: Snackbar,
  argTypes: {},
  args: {
    message: 'Token Amount has been changed',
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {},
};
