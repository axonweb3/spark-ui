import { Alert, AlertIcon, Box, Flex, Icon, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';
import Table from '../common/table';
import Button from '../common/button';
import Dialog from '../common/dialog';
import Pagination from '../common/pagination';
import Badge from '../common/badge';
import { useCallback, useMemo, useState } from 'react';
import { useDialog } from '@/hooks/ui/useDialog';
import { useNotification } from '@/hooks/ui/useNotification';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useStakeAmountQuery } from '@/hooks/query/useStakeAmountQuery';
import { trpc } from '@/server';

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
  const notify = useNotification();
  const showDialog = useDialog();
  const { isValidator } = useStakeRole();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { withdrawableAmount } = useStakeAmountQuery();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: withdrawal, isLoading } = trpc.delegate.withdrawal.useQuery(
    { page, limit },
    { keepPreviousData: true },
  );
  const displayAmount = useMemo(() => (withdrawableAmount.toNumber() / 10 ** 8).toFixed(2), [withdrawableAmount]);

  const handleWithdraw = useCallback(async () => {
    setIsConfirmDialogOpen(false);

    try {
      // FIXME: withdrawMutation
      showDialog({
        title: 'Withdrawal Requests Submitted',
        description: 'Your request has been submitted. Check out staking history for details.',
        hideCancel: true,
      });
      // XXX: we need a api to get the withdraw status, and then show notification when the withdraw tx is done.
      notify({
        status: 'success',
        message: 'Your withdrawal has been successful.',
      });
    } catch (e) {
      console.log(e);
      notify({
        status: 'error',
        message: (e as Error).message,
      });
    }
  }, [notify, showDialog]);

  return (
    <Box>
      <Box marginBottom="40px">
        <Alert status="info" backgroundColor="blue.200" borderRadius="8px">
          <Icon as={MdError} width="24px" height="24px" color="blue.400" marginRight={2} />
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
          data={withdrawal?.data ?? []}
          isLoading={isLoading}
          backgroundColor={isValidator ? 'secondary' : 'primary'}
        />
        <Box marginTop="30px">
          <Pagination
            total={withdrawal?.total ?? 0}
            current={page}
            onChange={setPage}
            onPageSizeChange={setLimit}
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
                <Text marginRight={1}>Your available withdrawal amount is:</Text>
                <Text fontWeight="extrabold">{displayAmount}AT</Text>
              </Flex>
              <Alert borderRadius="8px">
                <Flex>
                  <AlertIcon marginTop="4px" />
                  <Box>
                    <Text as="span" fontFamily="montserrat" fontSize="14px" marginRight={1}>
                      To withdraw unstaked tokens, you must withdraw all of them at once.
                    </Text>
                    <Text as="span" fontFamily="montserrat" fontSize="14px" fontWeight="extrabold">
                      Withdrawal requests are subject to a processing period.
                    </Text>
                  </Box>
                </Flex>
              </Alert>
            </Box>
          }
          confrmLabel="Withdraw"
          onConfirm={handleWithdraw}
          confirming={false}
        >
          <Button size="lg" onClick={() => setIsConfirmDialogOpen(true)}>
            Withdraw
          </Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
