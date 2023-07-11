import { Box, Table as ChakraTable, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useCallback } from 'react';
import { useConnect } from '@/hooks/useConnect';
import { renderAmount, renderDateString, renderTransactionHash } from '@/utils';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { stakeHistoryAtom } from '@/state/query/stake';

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
      return renderAmount(amount);
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
  const { pageNumber, data, isLoading, setPageNumber, setPageSize } = usePaginatedAtomQuery(stakeHistoryAtom, address);

  const expandedRowRender = useCallback(
    (row: any) => (
      <ChakraTable fontFamily="montserrat" variant="unstyled">
        <Thead color="black" fontWeight="bold">
          <Tr>
            <Th padding="16px" textTransform="capitalize">
              Timestamp
            </Th>
            <Th padding="16px" textTransform="capitalize">
              Transaction Hash
            </Th>
            <Th padding="16px" textTransform="capitalize">
              Amount (AT)
            </Th>
            <Th padding="16px" textTransform="capitalize">
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize="xs">
          {row.transactions.map((tx: any) => (
            <Tr key={tx.hash}>
              <Td padding="16px">{renderDateString(tx.timestamp)}</Td>
              <Td padding="16px">{renderTransactionHash(tx.hash)}</Td>
              <Td padding="16px">{renderAmount(tx.amount)}</Td>
              <Td padding="16px">
                <Badge status={tx.status} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    ),
    [],
  );

  return (
    <Box>
      <Table
        columns={columns}
        data={data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.transactions,
        }}
        isLoading={isLoading}
      />
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
