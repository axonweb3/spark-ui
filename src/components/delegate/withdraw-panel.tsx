import {
  Text,
  Alert,
  Box,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  AlertIcon,
} from '@chakra-ui/react';
import { MdError } from 'react-icons/md';
import Table from '../common/table';
import Button from '../common/button';
import Dialog from '../common/dialog';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useBalanceQuery } from '@/hooks/query/useBalanceQuery';
import { useMemo, useState } from 'react';
import { useDialog } from '@/hooks/ui/useDialog';
import { useConnect } from '@/hooks/useConnect';
import { useQuery } from 'react-query';
import axios from 'axios';

const columns = [
  {
    title: 'Transaction Hash',
    dataIndex: 'tx_hash',
    render: (hash: string) => hash.slice(0, 20) + '...' + hash.slice(-20),
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

export default function WithdrawPanel() {
  const { address } = useConnect();
  const showDialog = useDialog();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { withdrawableAmount } = useBalanceQuery(address);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery(
    ['delegateHistory', address, page],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/delegate', {
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

  const displayAmount = useMemo(
    () => (withdrawableAmount.toNumber() / 10 ** 8).toFixed(2),
    [withdrawableAmount],
  );

  const handleWithdraw = () => {
    setIsConfirmDialogOpen(false);
    showDialog({
      title: 'Withdrawal Requests Submitted',
      description:
        'Your request has been submitted. Check out staking history for details.',
      hideCancel: true,
    });
  };

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
            Undelegated tokens will be withdrawn in a single operation.
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
            Total Amount
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
          columns={columns}
          data={dataSource}
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
      <Flex justifyContent="center">
        <Dialog
          open={isConfirmDialogOpen}
          title="Total Withdraw Amount"
          description={
            <Box>
              <Flex fontFamily="montserrat" marginBottom="20px">
                <Text marginRight={1}>
                  Your available withdrawal amount is:
                </Text>
                <Text fontWeight="extrabold">{displayAmount}AT</Text>
              </Flex>
              <Alert borderRadius="8px">
                <Flex>
                  <AlertIcon marginTop="4px" />
                  <Box>
                    <Text
                      as="span"
                      fontFamily="montserrat"
                      fontSize="14px"
                      marginRight={1}
                    >
                      To withdraw unstaked tokens, you must withdraw all of them
                      at once.
                    </Text>
                    <Text
                      as="span"
                      fontFamily="montserrat"
                      fontSize="14px"
                      fontWeight="extrabold"
                    >
                      Withdrawal requests are subject to a processing period.
                    </Text>
                  </Box>
                </Flex>
              </Alert>
            </Box>
          }
          confrmLabel="Withdraw"
          onConfirm={handleWithdraw}
        >
          <Button size="lg" onClick={() => setIsConfirmDialogOpen(true)}>
            Withdraw
          </Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
