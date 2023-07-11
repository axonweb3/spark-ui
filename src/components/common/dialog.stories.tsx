import type { Meta, StoryObj } from '@storybook/react';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';

import Dialog from './dialog';
import Button from './button';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Dialog> = {
  title: 'SparkUI/Common/Dialog',
  component: Dialog,
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: 'Dialog Title',
    description:
      'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
  },
};

export const NoTitle: Story = {
  args: {
    description:
      'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
  },
};

export const CustomFooter: Story = {
  render: () => (
    <Dialog
      title="Dialog Title"
      open={true}
      description="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made."
      footer={
        <Flex width="full">
          <Flex alignItems="center">
            <Flex width={6} height={6} marginRight={1} alignItems="center" justifyContent="center">
              <MdOutlineCheckBoxOutlineBlank />
            </Flex>
            <Text fontSize="sm" color="blue.400">
              Do not show again
            </Text>
          </Flex>
          <Spacer />
          <Flex>
            <Button variant="outlined" size="sm">
              Cancel
            </Button>
            <Box width={2} />
            <Button variant="contained" size="sm">
              Ok
            </Button>
          </Flex>
        </Flex>
      }
    />
  ),
};
