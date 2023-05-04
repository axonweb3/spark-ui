import type { Meta, StoryObj } from '@storybook/react';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';

import { Dialog } from './dialog';
import { Button } from './button';

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
      open={true}
      title="Dialog Title"
      description="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made."
      footer={
        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-row items-center">
            <MdOutlineCheckBoxOutlineBlank className="w-6 h-6 mr-1" />
            <span className="text-sm text-blue-400">Do not show again</span>
          </div>
          <div className="flex flex-row">
            <Button variant="outlined" label={'Cancel'} size="small" />
            <div className="w-2" />
            <Button variant="contained" label={'Got it'} size="small" />
          </div>
        </div>
      }
    />
  ),
};
