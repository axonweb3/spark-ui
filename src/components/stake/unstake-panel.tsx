import React, { useCallback, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import { useSendTxMutation } from '@/hooks/useSendTxMutation';
import { useNotification } from '@/hooks/useNotification';
import axios from 'axios';

export default function UnstakePanel() {
  const notify = useNotification();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const { connected, address } = useConnect({});
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, stakeAmount } = useStakeAmountQuery(address);
  const [amount, setAmount] = useState(stakeAmount);
  const mutation = useSendTxMutation(
    (params: { address: string; amount: number }) => {
      return axios.post(`/api/unstake`, params);
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
    if (!stakeAmount.isZero()) {
      setAmount(stakeAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, stakeAmount, setAmount]);

  const startUnstakeTransaction = useCallback(() => {
    if (!address) return;
    mutation.mutate({ address, amount: amount.toNumber() });
  }, [address, amount, mutation]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Unstake Amount"
        total={stakeAmount}
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
function notify(arg0: { status: string; message: string }) {
  throw new Error('Function not implemented.');
}
