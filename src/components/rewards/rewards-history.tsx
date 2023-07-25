import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useState } from 'react';
import { trpc } from '@/server';

const columns = [
  {
    title: 'Epoch',
    dataIndex: 'epoch',
  },
  {
    title: 'Total Amount',
    dataIndex: 'amount',
    render: (amount: string) => {
      return `${(parseInt(amount, 10) / 10 ** 8).toFixed(2)} AT`;
    },
  },
  {
    title: 'Rewards Status',
    dataIndex: 'locked',
    render: (locked: boolean, data: any) => {
      return <Badge key={data.id} status={locked ? 'failed' : 'success'} label={locked ? 'Locked' : 'Unlock'} />;
    },
  },
];

export function RewardsHistory() {
  const { isValidator } = useStakeRole();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: history, isLoading } = trpc.reward.history.useQuery({ page, limit }, { keepPreviousData: true });

  return (
    <Box>
      <Table
        columns={columns}
        data={history?.data ?? []}
        isLoading={isLoading}
        backgroundColor={isValidator ? 'secondary' : 'primary'}
      />
      <Box marginTop="30px">
        <Pagination
          total={history?.total ?? 0}
          current={page}
          onChange={setPage}
          onPageSizeChange={setLimit}
          showQuickJumper
        />
      </Box>
    </Box>
  );
}
