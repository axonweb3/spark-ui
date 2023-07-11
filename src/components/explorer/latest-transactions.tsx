import { Box, Text } from '@chakra-ui/react';
import Table from '../common/table';
import Badge from '../common/badge';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { statsLatestStakeTransactionsAtom } from '@/state/query/stats';

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
    render: (hash: string) => hash.slice(0, 20) + '...' + hash.slice(-20),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string, data: any) => {
      return <Badge key={data.id} status={status} />;
    },
  },
];

export function LatestTransactions() {
  const { data, isLoading } = usePaginatedAtomQuery(statsLatestStakeTransactionsAtom);

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Latest Staking / Delegation Transactions
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table columns={columns} data={data} isLoading={isLoading} />
      </Box>
    </Box>
  );
}
