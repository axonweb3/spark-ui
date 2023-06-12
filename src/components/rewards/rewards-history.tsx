import { Box } from '@chakra-ui/react';
import Pagination from '../common/pagination';
import Table from '../common/table';
import Badge from '../common/badge';
import { useMemo, useState } from 'react';
import { useConnect } from 'ckb-hooks';
import { useQuery } from 'react-query';
import axios from 'axios';

const columns = [
  {
    title: 'Epoch',
    dataIndex: 'epoch',
  },
  {
    title: 'Total Amount',
    dataIndex: 'amount',
    sorter: true,
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
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['rewardsHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/reward', {
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
