import React, { useCallback, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/useNotification';
import { useSendTxMutation } from '@/hooks/useSendTxMutation';
import axios from 'axios';

export default function StakePanel() {
  const notify = useNotification();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const { connected, address } = useConnect();
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, availableAmount } = useStakeAmountQuery(address);
  const [amount, setAmount] = useState(availableAmount);
  const mutation = useSendTxMutation(
    (params: { address: string; amount: number }) => {
      return axios.post(`/api/stake`, params);
    },
    {
      onError: (err) => {
        notify({
          status: 'error',
          message: (err as Error).message,
        });
      },
      onSuccess: () => {
        setIsOpenDialog(true);
      },
    },
  );

  React.useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, availableAmount, setAmount]);

  const startStakeTransaction = useCallback(() => {
    if (!address) return;
    mutation.mutate({ address, amount: amount.toNumber() });
  }, [address, amount, mutation]);

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
          onClick={startStakeTransaction}
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
