import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './text-field';
import { MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
  title: 'SparkUI/TextField',
  component: TextField,
  argTypes: {},
  args: {
    placeholder: 'Placeholder',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    name: 'Text Field',
  },
};

export const Small: Story = {
  args: {
    name: 'Text Field',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    name: 'Text Field',
    size: 'large',
  },
};

export const Warning: Story = {
  args: {
    name: 'Text Field',
    size: 'medium',
    state: 'warning',
  },
};

export const Error: Story = {
  args: {
    name: 'Text Field',
    size: 'medium',
    state: 'error',
  },
};

export const WithMessage: Story = {
  args: {
    name: 'Text Field',
    message: 'This is a message',
  },
};

export const WithErrorMessage: Story = {
  args: {
    name: 'Text Field',
    state: 'error',
    message: 'This is a message',
  },
};

export const WithIcon: Story = {
  args: {
    name: 'Text Field',
    left: (
      <div className="pl-2">
        <MdOutlineSearch className="w-4 h-4" />
      </div>
    ),
    right: (
      <div className="pr-2">
        <MdKeyboardArrowDown className="w-4 h-4" />
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    name: 'Text Field',
    disabled: true,
    message: 'This is a message',
  },
};
