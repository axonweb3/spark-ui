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
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Amount (AT)',
        dataIndex: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return <Badge status={status} />;
        },
      },
    ],
    data: [
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

export const Expandable: Story = {
  args: {
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Amount (AT)',
        dataIndex: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return <Badge status={status} />;
        },
      },
    ],
    expandable: {
      rowExpandable: (record) => record?.form,
      expandedRowRender: (record) => {
        return (
          <Table
            columns={[
              {
                title: 'Type',
                dataIndex: 'type',
              },
              {
                title: 'Amount (AT)',
                dataIndex: 'amount',
              },
              {
                title: 'Address',
                dataIndex: 'address',
              },
            ]}
            data={record?.form}
          />
        );
      },
    },
    data: [
      {
        id: '82659894393984111',
        amount: 1000,
        status: 'succeed',
        form: [
          {
            type: 'Stake',
            amount: 1000,
            address: '0xckt1234567890123456789012345678901234567890',
          },
          {
            type: 'Delegate',
            amount: 2000,
            address: '0xckt1234567890123456789012345678901234567891',
          },
        ],
      },
      {
        id: '82659894393984111',
        amount: 1000,
        status: 'pending',
        form: [
          {
            type: 'Stake',
            amount: 1000,
            address: '0xckt1234567890123456789012345678901234567890',
          },
          {
            type: 'Delegate',
            amount: 2000,
            address: '0xckt1234567890123456789012345678901234567891',
          },
        ],
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Amount (AT)',
        dataIndex: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return <Badge status={status} />;
        },
      },
    ],
    data: [
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
