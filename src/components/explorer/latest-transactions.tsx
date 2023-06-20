import { Text, Box } from '@chakra-ui/react';
import Table from '../common/table';
import Badge from '../common/badge';
import { ILatestStakeTransaction } from '@/hooks/query/useStakeStatsQuery';

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

export interface ILatestStakeTransactionsProps {
  dataSource: ILatestStakeTransaction[];
}

export function LatestTransactions(props: ILatestStakeTransactionsProps) {
  const { dataSource } = props;

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Latest Staking / Delegation Transactions
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table columns={columns} data={dataSource} />
      </Box>
    </Box>
  );
}
