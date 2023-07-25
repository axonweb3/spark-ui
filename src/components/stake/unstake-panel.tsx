import React, { useCallback, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { BI } from '@ckb-lumos/bi';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/ui/useNotification';
import { useConnect } from '@/hooks/useConnect';
import { useStakeAmountQuery } from '@/hooks/query/useStakeAmountQuery';

export default function UnstakePanel() {
  const notify = useNotification();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const { isDisconnected, address } = useConnect();
  const { stakeAmount, isLoading } = useStakeAmountQuery();
  const [amount, setAmount] = useState(stakeAmount);

  React.useEffect(() => {
    if (!stakeAmount.isZero()) {
      setAmount(stakeAmount);
    }
    if (isDisconnected) {
      setAmount(BI.from(0));
    }
  }, [isDisconnected, stakeAmount, setAmount]);

  const startUnstakeTransaction = useCallback(async () => {
    if (!address) return;
    try {
      // FIXME
      // await unstakeMutation.mutate([{ amount: amount.toNumber() }]);
      setIsOpenDialog(true);
    } catch (e) {
      notify({
        status: 'error',
        message: (e as Error).message,
      });
    }
  }, [address, notify]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Unstake Amount"
        total={stakeAmount}
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
          isLoading={false}
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
