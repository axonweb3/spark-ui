import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import format from 'date-fns/format';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useState } from 'react';
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
    render: (hash: string) => {
      return hash && hash.substring(0, 30) + '...';
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: true,
    render: (amount: string) => {
      return `${(parseInt(amount, 10) / 10 ** 8).toFixed(2)} AT`;
    },
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

export function WithdrawalHistory() {
  const { isValidator } = useStakeRole();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: withdrawal, isLoading } = trpc.reward.withdrawal.useQuery({ page, limit }, { keepPreviousData: true });

  return (
    <Box>
      <Table
        columns={columns}
        data={withdrawal?.data ?? []}
        isLoading={isLoading}
        backgroundColor={isValidator ? 'secondary' : 'primary'}
      />
      <Box marginTop="30px">
        <Pagination
          total={withdrawal?.total ?? 0}
          current={page}
          onChange={setPage}
          onPageSizeChange={setLimit}
          showQuickJumper
        />
      </Box>
    </Box>
  );
}
