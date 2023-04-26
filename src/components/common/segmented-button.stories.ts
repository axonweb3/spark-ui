import type { Meta, StoryObj } from '@storybook/react';

import { SegmentedButton } from './segmented-button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SegmentedButton> = {
  title: 'SparkUI/SegmentedButton',
  component: SegmentedButton,
  args: {
    options: ['One', 'Two', 'There'],
    defaultValue: 'One',
    value: 'One',
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedButton>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
