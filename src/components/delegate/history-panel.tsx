import { Text, Box } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useConnect } from 'ckb-hooks';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const columns = [
  {
    title: 'Event',
    dataIndex: 'event',
    sorter: true,
    render: (event: string) => {
      return <Text textTransform="capitalize">{event}</Text>;
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
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
