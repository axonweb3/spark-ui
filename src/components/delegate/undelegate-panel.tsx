import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import DelegatedAmount from './delegated-amount';

const MOCK_COLUMNS = [
  {
    title: 'Delegated Address',
    dataIndex: 'delegatedTo',
  },
  {
    title: 'Delegated Amount',
    dataIndex: 'amount',
    sorter: true,
    width: '50%',
    render: (amount: number) => <DelegatedAmount amount={amount} />,
  },
];

const MOCK_DATASOURCES = [
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
  {
    delegatedTo: '0x82659894393984111',
    amount: 1000,
  },
];

export default function UndelegatePanel() {
  return (
    <Box>
      <Table columns={MOCK_COLUMNS} dataSources={MOCK_DATASOURCES} />
      <Box marginTop="30px">
        <Pagination total={500} showQuickJumper />
      </Box>
      <Flex justifyContent="center" marginTop="40px">
        <Button size="lg">Commit</Button>
      </Flex>
    </Box>
  );
}
