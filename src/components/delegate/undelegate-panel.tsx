import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Table from '../common/table';
import DelegatedAmount from './delegated-amount';
import { trpc } from '@/server';

const columns = [
  {
    title: 'Delegated To',
    dataIndex: 'staker',
    render: (address: string) => address.slice(0, 20) + '...' + address.slice(-20),
  },
  {
    title: 'Delegated Amount',
    dataIndex: 'amount',
    width: '40%',
    render: (amount: number) => <DelegatedAmount amount={amount} />,
  },
];

export default function UndelegatePanel() {
  const { data: records, isLoading } = trpc.delegate.records.useQuery(undefined, { keepPreviousData: true });

  return (
    <Box>
      <Table columns={columns} data={records ?? []} isLoading={isLoading} />
      <Flex justifyContent="center" marginTop="40px">
        <Button size="lg">Commit</Button>
      </Flex>
    </Box>
  );
}
