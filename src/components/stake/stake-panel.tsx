import React, { useCallback, useMemo, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BI } from '@ckb-lumos/bi';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/ui/useNotification';
import { useDialog } from '@/hooks/ui/useDialog';
import { useConnect } from '@/hooks/useConnect';
import { ConnectButton } from '../connect-button';
import { useStakeAmountQuery } from '@/hooks/query/useStakeAmountQuery';

export default function StakePanel() {
  const notify = useNotification();
  const showDialog = useDialog();
  const { isConnected, address } = useConnect();
  const disabled = useMemo(() => !isConnected, [isConnected]);
  const [amount, setAmount] = useState(BI.from(0));
  const { availableAmount, isLoading } = useStakeAmountQuery();

  React.useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (disabled) {
      setAmount(BI.from(0));
    }
  }, [disabled, availableAmount, setAmount]);

  const startStakeTransaction = useCallback(async () => {
    if (!address) return;
    try {
      // FIXME
      // await stakeMutation.mutate([{ amount: amount.toNumber() }]);
      showDialog({
        title: 'Staking Request Submitted',
        description: 'Your request has been submitted. Check out staking history for details.',
        hideCancel: true,
      });
    } catch (e) {
      notify({
        status: 'error',
        message: (e as Error).message,
      });
    }
  }, [address, notify, showDialog]);

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
        <ConnectButton
          size="lg"
          disabled={disabled || amount.isZero()}
          isLoading={false}
          onClick={startStakeTransaction}
        >
          Submit
        </ConnectButton>
      </Flex>
    </Box>
  );
}
