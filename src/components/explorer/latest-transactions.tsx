import { Box, Text } from '@chakra-ui/react';
import Table from '../common/table';
import Badge from '../common/badge';
import { useStakeRole } from '@/hooks/useStakeRole';
import format from 'date-fns/format';
import { trpc } from '@/server';

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    render: (timestamp: number) => format(new Date(timestamp), 'yyyy/MM/dd HH:mm:ss'),
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
    render: (hash: string) => hash.slice(0, 20) + '...' + hash.slice(-20),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (amount: string) => {
      return `${(parseInt(amount, 10) / 10 ** 8).toFixed(2)} AT`;
    },
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
  const { isValidator } = useStakeRole();
  const { data: latestStakeTransactions, isLoading } = trpc.stats.latestStakeTransactions.useQuery({
    page: 1,
    limit: 10,
  });

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontSize="18px" fontWeight="semibold">
          Latest Staking / Delegation Transactions
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table
          columns={columns}
          data={latestStakeTransactions?.data ?? []}
          isLoading={isLoading}
          backgroundColor={isValidator ? 'secondary' : 'primary'}
        />
      </Box>
    </Box>
  );
}
