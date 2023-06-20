import {
  Text,
  Box,
  Table as ChakraTable,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
} from '@chakra-ui/react';
import Table from '../common/table';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useConnect } from '@/hooks/useConnect';
import { renderAmount, renderDateString, renderTransactionHash } from '@/utils';

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
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['stakeHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/stake', {
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
        data={dataSource}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.transactions,
        }}
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
