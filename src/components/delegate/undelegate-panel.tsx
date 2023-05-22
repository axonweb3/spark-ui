import { Box } from '@chakra-ui/react';
import Table from '../common/table';

export default function UndelegatePanel() {
  return (
    <Box>
      <Table
        columns={[
          {
            title: 'Delegated Address',
            dataIndex: 'delegatedTo',
          },
          {
            title: 'Delegated Amount',
            dataIndex: 'amount',
            sorter: true,
          },
        ]}
        dataSources={[
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
        ]}
      />
    </Box>
  );
}
