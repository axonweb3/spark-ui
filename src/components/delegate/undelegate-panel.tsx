import React, { useMemo, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import DelegatedAmount from './delegated-amount';
import { useConnect } from '@/hooks/useConnect';
import { useQuery } from 'react-query';
import axios from 'axios';

const MOCK_COLUMNS = [
  {
    title: 'Delegated To',
    dataIndex: 'delegated_to',
    render: (address: string) =>
      address.slice(0, 20) + '...' + address.slice(-20),
  },
  {
    title: 'Delegated Amount',
    dataIndex: 'amount',
    width: '40%',
    render: (amount: number) => <DelegatedAmount amount={amount} />,
  },
];

export default function UndelegatePanel() {
  const { address } = useConnect();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['delegateHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/delegate/records', {
        params: {
          address,
          pageNumber: page,
          event: 'withdraw',
        },
      });
      return response.data;
    },
    { keepPreviousData: true },
  );

  const dataSource = useMemo(() => data?.data ?? [], [data]);

  return (
    <Box>
      <Table columns={MOCK_COLUMNS} data={dataSource} isLoading={isFetching} />
      <Box marginTop="30px">
        <Pagination
          total={500}
          current={page}
          onChange={setPage}
          showQuickJumper
        />
      </Box>
      <Flex justifyContent="center" marginTop="40px">
        <Button size="lg">Commit</Button>
      </Flex>
    </Box>
  );
}
