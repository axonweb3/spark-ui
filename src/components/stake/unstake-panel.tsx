import React, { useCallback, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { BI } from '@ckb-lumos/bi';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/ui/useNotification';
import { useConnect } from '@/hooks/useConnect';
import { stakedAmountAtom } from '@/state/query/amount';
import { useAmountAtomQuery } from '@/hooks/query/useAmountAtomQuery';
import { useSendTransactionAtomMutate } from '@/hooks/mutate/useSendTransactionAtomMutate';
import { unstakeMutateAtom } from '@/state/mutate/stake';

export default function UnstakePanel() {
  const notify = useNotification();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const { isDisconnected, address } = useConnect();
  const { amount: stakedAmount, isLoading } = useAmountAtomQuery(address, stakedAmountAtom);
  const [amount, setAmount] = useState(stakedAmount);
  const unstakeMutation = useSendTransactionAtomMutate(unstakeMutateAtom);

  React.useEffect(() => {
    if (!stakedAmount.isZero()) {
      setAmount(stakedAmount);
    }
    if (isDisconnected) {
      setAmount(BI.from(0));
    }
  }, [isDisconnected, stakedAmount, setAmount]);

  const startUnstakeTransaction = useCallback(async () => {
    if (!address) return;
    try {
      await unstakeMutation.mutate([{ amount: amount.toNumber() }]);
      setIsOpenDialog(true);
    } catch (e) {
      notify({
        status: 'error',
        message: (e as Error).message,
      });
    }
  }, [address, amount, unstakeMutation, notify]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Unstake Amount"
        total={stakedAmount}
        amount={amount}
        onChange={setAmount}
        disabled={isDisconnected}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <Button
          size="lg"
          disabled={isDisconnected || amount.isZero()}
          isLoading={unstakeMutation.isLoading}
          onClick={startUnstakeTransaction}
        >
          Submit
        </Button>
        <Dialog
          open={isOpenDialog}
          title="Unstake Request Submitted"
          description="Your request has been submitted, check out staking history for details."
          hideCancel={true}
          onConfirm={() => setIsOpenDialog(false)}
        />
      </Flex>
    </Box>
  );
}
