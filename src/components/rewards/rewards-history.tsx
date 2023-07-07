import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import { useConnect } from '@/hooks/useConnect';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { rewardHistoryAtom } from '@/state/query/reward';

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
      return (
        <Badge
          key={data.id}
          status={locked ? 'failed' : 'success'}
          label={locked ? 'Locked' : 'Unlock'}
        />
      );
    },
  },
];

export function RewardsHistory() {
  const { address } = useConnect();
  const { pageNumber, setPageNumber, setPageSize, isLoading, data } =
    usePaginatedAtomQuery(rewardHistoryAtom, address);

  return (
    <Box>
      <Table columns={columns} data={data} isLoading={isLoading} />
      <Box marginTop="30px">
        <Pagination
          total={500}
          current={pageNumber}
          onChange={setPageNumber}
          onPageSizeChange={setPageSize}
          showQuickJumper
        />
      </Box>
    </Box>
  );
}
