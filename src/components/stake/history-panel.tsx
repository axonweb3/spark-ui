import { Box } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';

const MOCK_COLUMNS = [
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
    render: (status: string, data: any) => {
      return <Badge key={data.id} status={status} />;
    },
  },
];

const MOCK_DATASOURCE = [
  {
    id: '82659894393984111',
    amount: 1000,
    status: 'succeed',
  },
  {
    id: '82659894393984222',
    amount: 1000,
    status: 'pending',
  },
  {
    id: '82659894393984333',
    amount: 1000,
    status: 'failed',
  },
  {
    id: '82659894393984444',
    amount: 1000,
    status: 'succeed',
  },
  {
    id: '82659894393984555',
    amount: 1000,
    status: 'pending',
  },
  {
    id: '82659894393984666',
    amount: 1000,
    status: 'failed',
  },
];

export default function HistoryPanel() {
  return (
    <Box>
      <Table columns={MOCK_COLUMNS} dataSources={MOCK_DATASOURCE} />

      <Box marginTop="30px">
        <Pagination total={500} showQuickJumper />
      </Box>
    </Box>
  );
}
