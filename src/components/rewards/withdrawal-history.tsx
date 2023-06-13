import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import format from 'date-fns/format';
import axios from 'axios';
import { useConnect } from '@/hooks/useConnect';

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
    }
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
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['withdrawalHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/reward/withdrawal', {
        params: {
          address,
          pageNumber: page,
        },
      });
      return response.data;
    },
    { keepPreviousData: true },
  );

  const dataSources = useMemo(() => data?.data ?? [], [data]);
  // const total = useMemo(() => Math.ceil((data?.total ?? 0) / pageSize), [data, pageSize]);

  return (
    <Box>
      <Table
        columns={columns}
        dataSources={dataSources}
        isLoading={isFetching}
      />
      <Box marginTop="30px">
        <Pagination
          total={500}
          current={page}
          onChange={setPage}
          showQuickJumper
        />
      </Box>
    </Box>
  );
}
