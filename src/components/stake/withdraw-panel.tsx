import {
  Text,
  Alert,
  Box,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
} from '@chakra-ui/react';
import { MdError } from 'react-icons/md';
import Table from '../common/table';
import Button from '../common/button';
import Dialog from '../common/dialog';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useConnect } from '@spinal-ckb/react';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';

const MOCK_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Amount (AT)',
    dataIndex: 'amount',
    sorter: true,
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

const MOCK_DATASOURCE = [
  {
    id: '82659894393984111',
    amount: 1000,
    status: 'success',
  },
  {
    id: '82659894393984222',
    amount: 1000,
    status: 'pending',
  },
  {
    id: '82659894393984333',
    amount: 1000,
    status: 'failed',
  },
  {
    id: '82659894393984444',
    amount: 1000,
    status: 'success',
  },
  {
    id: '82659894393984555',
    amount: 1000,
    status: 'pending',
  },
  {
    id: '82659894393984666',
    amount: 1000,
    status: 'failed',
  },
];

export default function WithdrawPanel() {
  const { address } = useConnect();
  const { withdrawableAmount } = useStakeAmountQuery(address);

  return (
    <Box>
      <Box marginBottom="40px">
        <Alert status="info" backgroundColor="blue.200" borderRadius="8px">
          <Icon
            as={MdError}
            width="24px"
            height="24px"
            color="blue.400"
            marginRight={2}
          />
          <Text fontFamily="montserrat" fontWeight="medium">
            Alternative: Unstaked tokens will be withdrawn in a single
            operation.
          </Text>
        </Alert>
      </Box>
      <Box
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="16px"
        backgroundColor="white"
        padding="16px"
        marginBottom="40px"
      >
        <Stat fontFamily="montserrat">
          <StatLabel fontSize="md" fontWeight="bold">
            Total Withdrawable Amount
          </StatLabel>
          <StatNumber>
            <Flex alignItems="baseline">
              <Text fontSize="30px" marginRight={1}>
                {(withdrawableAmount.toNumber() / 10 ** 8).toFixed(2)}
              </Text>
              <Text fontSize="md">AT</Text>
            </Flex>
          </StatNumber>
        </Stat>
      </Box>
      <Box marginBottom="40px">
        <Table
          rowKey="id"
          columns={MOCK_COLUMNS}
          dataSources={MOCK_DATASOURCE}
        />
        <Box marginTop="30px">
          <Pagination total={500} showQuickJumper />
        </Box>
      </Box>
      <Flex justifyContent="center">
        <Dialog
          title="Total Withdrawlable Amount"
          description="Your available withdrawal amount is 2000AT"
          confrmLabel="Withdraw"
        >
          <Button size="lg">Withdraw</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
