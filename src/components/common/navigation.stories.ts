import type { Meta, StoryObj } from '@storybook/react';

import Navigation from './navigation';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Navigation> = {
  title: 'SparkUI/Common/Navigation',
  component: Navigation,
  argTypes: {},
  args: {
    navs: [
      {
        name: 'Stake',
        href: '/stake',
      },
      {
        name: 'Delegate',
        href: '/delegate',
      },
      {
        name: 'Rewards',
        href: '/rewards',
      },
      {
        name: 'Explorer',
        href: '/explorer',
      },
    ],
    active: 'Stake',
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {},
};
