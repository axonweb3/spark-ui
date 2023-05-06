import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './text-field';
import { MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';
import { Field, Form, Root } from '@radix-ui/react-form';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
  title: 'SparkUI/Common/TextField',
  component: TextField,
  argTypes: {},
  decorators: [
    Story => (
      <Root>
        <Field name="text-field" className="inline-block">
          {Story()}
        </Field>
      </Root>
    ),
  ],
  args: {
    placeholder: 'Placeholder',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Warning: Story = {
  args: {
    size: 'medium',
    state: 'warning',
  },
};

export const Error: Story = {
  args: {
    size: 'medium',
    state: 'error',
  },
};

export const WithMessage: Story = {
  args: {
    message: 'This is a message',
  },
};

export const WithErrorMessage: Story = {
  args: {
    state: 'error',
    message: 'This is a message',
  },
};

export const WithIcon: Story = {
  args: {
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
    disabled: true,
    message: 'This is a message',
  },
};
