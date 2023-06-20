import { Text, Box } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useConnect } from '@/hooks/useConnect';

const columns = [
  {
    title: 'Event',
    dataIndex: 'event',
    render: (event: string) => {
      return <Text textTransform="capitalize">{event}</Text>;
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
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

export default function HistoryPanel() {
  const { address } = useConnect();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['delegateHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/delegate', {
        params: {
          address,
          pageNumber: page,
        },
      });
      return response.data;
    },
    { keepPreviousData: true },
  );

  const dataSource = useMemo(() => data?.data ?? [], [data]);
  // const total = useMemo(() => Math.ceil((data?.total ?? 0) / pageSize), [data, pageSize]);

  return (
    <Box>
      <Table
        columns={columns}
        data={dataSource}
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
