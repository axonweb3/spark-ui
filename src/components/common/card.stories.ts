import type { Meta, StoryObj } from '@storybook/react';

import Card from './card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'SparkUI/Common/Card',
  component: Card,
  argTypes: {},
  args: {
    title: 'Card Title',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card Content',
  },
};
