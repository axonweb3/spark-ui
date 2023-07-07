import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import DelegatedAmount from './delegated-amount';
import { useConnect } from '@/hooks/useConnect';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { delegatedRecordsAtom } from '@/state/query/delegate';

const columns = [
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
  const { pageNumber, setPageNumber, setPageSize, isLoading, data } =
    usePaginatedAtomQuery(delegatedRecordsAtom, address);

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
      <Flex justifyContent="center" marginTop="40px">
        <Button size="lg">Commit</Button>
      </Flex>
    </Box>
  );
}
