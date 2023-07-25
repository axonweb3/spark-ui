import { Box, Table as ChakraTable, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useCallback, useState } from 'react';
import { renderAmount, renderDateString, renderTransactionHash } from '@/utils';
import { trpc } from '@/server';
import { HistoryEvent } from '@/server/api/type';

const columns = [
  {
    title: 'Event',
    dataIndex: 'event',
    render: (event: number) => {
      return <Text textTransform="capitalize">{HistoryEvent[event]}</Text>;
    },
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: history, isLoading } = trpc.delegate.history.useQuery({ page, limit }, { keepPreviousData: true });

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
        data={history?.data ?? []}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.transactions,
        }}
        isLoading={isLoading}
      />
      <Box marginTop="30px">
        <Pagination
          total={history?.total ?? 0}
          current={page}
          onChange={setPage}
          onPageSizeChange={setLimit}
          showQuickJumper
        />
      </Box>
    </Box>
  );
}
