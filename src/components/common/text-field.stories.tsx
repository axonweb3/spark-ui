import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextField from './text-field';
import { MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';
import { Box } from '@chakra-ui/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
  title: 'SparkUI/Common/TextField',
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
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Warning: Story = {
  args: {
    size: 'md',
    status: 'warning',
  },
};

export const Error: Story = {
  args: {
    size: 'md',
    status: 'error',
  },
};

export const WithMessage: Story = {
  args: {
    message: 'This is a message',
  },
};

export const WithErrorMessage: Story = {
  args: {
    status: 'error',
    message: 'This is a message',
  },
};

export const WithIcon: Story = {
  args: {
    leftAddon: (
      <Box paddingRight={2} width={4} height={4}>
        <MdOutlineSearch />
      </Box>
    ),
    rightAddon: (
      <Box paddingRight={2} width={4} height={4}>
        <MdKeyboardArrowDown />
      </Box>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
