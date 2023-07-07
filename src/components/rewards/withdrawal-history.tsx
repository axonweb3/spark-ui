import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import format from 'date-fns/format';
import { useConnect } from '@/hooks/useConnect';
import { rewardWithdrawalAtom } from '@/state/query/reward';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    render: (timestamp: number) =>
      format(new Date(timestamp), 'yyyy/MM/dd HH:mm:ss'),
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
  const { address } = useConnect();
  const { pageNumber, setPageNumber, setPageSize, isLoading, data } =
    usePaginatedAtomQuery(rewardWithdrawalAtom, address);

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
