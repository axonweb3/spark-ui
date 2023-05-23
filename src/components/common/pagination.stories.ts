import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './pagination';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Pagination> = {
  title: 'SparkUI/Common/Pagination',
  component: Pagination,
  argTypes: {},
  args: {
    total: 100,
    defaultCurrent: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
};

export const ShowQuickJump: Story = {
  args: {
    showQuickJumper: true,
  },
};
