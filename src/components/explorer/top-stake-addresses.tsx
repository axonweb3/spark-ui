import { Text, Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';

const MOCK_COLUMNS = [
  {
    title: 'Rank',
    dataIndex: 'rank',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Stake Amount',
    dataIndex: 'amount',
    sorter: true,
  },
];

const MOCK_DATASOURCE = [
  {
    rank: 1,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
  {
    rank: 2,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
  {
    rank: 3,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
  {
    rank: 4,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
  {
    rank: 5,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
  {
    rank: 6,
    address: 'ckb1qzda0cr08m85hc8jlnf...',
    amount: 1000,
  },
];

export function TopStakeAddresses() {
  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Top Staking Addresses
        </Text>
      </Box>
      <Table rowKey="rank" columns={MOCK_COLUMNS} dataSources={MOCK_DATASOURCE} />
      <Box marginTop="30px">
        <Pagination total={500} showQuickJumper />
      </Box>
    </Box>
  );
}
