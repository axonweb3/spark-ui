import { Box } from '@chakra-ui/react';
import Table from '../common/table';

export default function HistoryPanel() {
  return (
    <Box>
      <Table
        columns={[
          {
            title: 'Action',
            dataIndex: 'action',
          },
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
            sorter: true,
          },
        ]}
        dataSources={[
          {
            action: 'Stake',
            id: '82659894393984111',
            amount: 1000,
            status: 'Successed',
          },
          {
            action: 'Unstake',
            id: '82659894393984222',
            amount: 1000,
            status: 'Pending',
          },
          {
            action: 'Stake',
            id: '82659894393984333',
            amount: 1000,
            status: 'Failed',
          },
          {
            action: 'Stake',
            id: '82659894393984444',
            amount: 1000,
            status: 'Successed',
          },
          {
            action: 'Withdraw',
            id: '82659894393984555',
            amount: 1000,
            status: 'Pending',
          },
          {
            action: 'Withdraw',
            id: '82659894393984666',
            amount: 1000,
            status: 'Failed',
          },
        ]}
      />
    </Box>
  );
}
