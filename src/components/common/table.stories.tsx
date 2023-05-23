import type { Meta, StoryObj } from '@storybook/react';

import Table from './table';
import Badge from './badge';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Table> = {
  title: 'SparkUI/Common/Table',
  component: Table,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    rowKey: 'id',
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
      },
      {
        title: 'Amount (AT)',
        dataIndex: 'amount',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status, data) => {
          return <Badge key={data.id} status={status} />
        }
      },
    ],
    dataSources: [
      {
        id: '82659894393984111',
        amount: 1000,
        status: 'succeed',
      },
      {
        id: '82659894393984111',
        amount: 1000,
        status: 'pending',
      },
      {
        id: '82659894393984111',
        amount: 1000,
        status: 'failed',
      },
    ],
  },
};
