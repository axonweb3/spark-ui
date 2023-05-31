import React, { useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useStakeMutation } from '@/hooks/useStakeMutation';
import { useNotification } from '@/hooks/useNotification';

export default function StakePanel() {
  const notify = useNotification();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const { connected, address } = useConnect();
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, availableAmount } = useStakeAmountQuery(address);
  const [amount, setAmount] = useState(availableAmount);
  const mutation = useStakeMutation({
    onError: (err) => {
      notify({
        status: 'error',
        message: (err as Error).message,
      });
    },
    onSuccess: () => {
      setIsOpenDialog(true);
    },
  });

  React.useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, availableAmount, setAmount]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Stake Amount"
        total={availableAmount}
        amount={amount}
        onChange={setAmount}
        disabled={disabled}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <Button
          size="lg"
          disabled={disabled || amount.isZero()}
          isLoading={mutation.isLoading}
          onClick={() => address && mutation.mutate({ address, amount })}
        >
          Submit
        </Button>
        <Dialog
          open={isOpenDialog}
          title="Staking Submitted"
          description="Your transaction is already submitted, please check out the stake history later."
          hideCancel={true}
          onConfirm={() => setIsOpenDialog(false)}
        />
      </Flex>
    </Box>
  );
}
