import React, { useCallback, useMemo, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BI } from '@ckb-lumos/lumos';
import { useBalanceQuery } from '@/hooks/query/useBalanceQuery';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/ui/useNotification';
import { useSendTxMutation } from '@/hooks/query/useSendTxMutation';
import axios from 'axios';
import { useDialog } from '@/hooks/ui/useDialog';
import { useConnect } from '@/hooks/useConnect';
import { ConnectButton } from '../connect-button';

export default function StakePanel() {
  const notify = useNotification();
  const showDialog = useDialog();
  const { isDisconnected, address } = useConnect();
  const { isLoading, availableAmount } = useBalanceQuery(address);
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
        showDialog({
          title: 'Staking Request Submitted',
          description: 'Your request has been submitted. Check out staking history for details.',
          hideCancel: true,
        });
      },
    },
  );

  React.useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (isDisconnected) {
      setAmount(BI.from(0));
    }
  }, [isDisconnected, availableAmount, setAmount]);

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
        disabled={isDisconnected}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <ConnectButton
          size="lg"
          disabled={isDisconnected || amount.isZero()}
          isLoading={mutation.isLoading}
          onClick={startStakeTransaction}
        >
          Submit
        </ConnectButton>
      </Flex>
    </Box>
  );
}
