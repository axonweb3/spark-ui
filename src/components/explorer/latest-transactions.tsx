import { Text, Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';

const MOCK_COLUMNS = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
  },
  {
    title: 'Amount',
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
    timestamp: '2023/04/04 14:47:15',
    amount: 1000,
    hash: 'ckb1qzda0cr08m85hc8jlnf...',
    status: 'succeed',
  },
  {
    timestamp: '2023/04/04 14:47:13',
    amount: 1000,
    hash: 'ckb1qzda0cr08m85hc8jlnf...',
    status: 'warning',
  },
  {
    timestamp: '2023/04/04 14:47:10',
    amount: 1000,
    hash: 'ckb1qzda0cr08m85hc8jlnf...',
    status: 'failed',
  },
  {
    timestamp: '2023/04/04 14:47:05',
    amount: 1000,
    hash: 'ckb1qzda0cr08m85hc8jlnf...',
    status: 'succeed',
  },
];

export function LatestTransactions() {
  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Latest Staking / Delegation Transactions
        </Text>
      </Box>
      <Table rowKey="timestamp" columns={MOCK_COLUMNS} dataSources={MOCK_DATASOURCE} />
      <Box marginTop="30px">
        <Pagination total={500} showQuickJumper />
      </Box>
    </Box>
  );
}
