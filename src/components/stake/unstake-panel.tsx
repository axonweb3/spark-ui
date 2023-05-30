import React, { useCallback, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import { useAmountState } from '@/hooks/useAmountState';

export default function UnstakePanel() {
  const { connected, address } = useConnect({});
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, stakeAmount } = useStakeAmountQuery(address);
  const { amount, setAmount, onAmountChange } = useAmountState(stakeAmount);

  React.useEffect(() => {
    if (!stakeAmount.isZero()) {
      setAmount(stakeAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, stakeAmount, setAmount]);

  const handleOptionChange = useCallback(
    (option: string) => {
      switch (option) {
        case 'Custom':
          if (!amount.eq(stakeAmount)) {
            setAmount(stakeAmount);
          }
          break;
        default:
          const [percent] = option.split('%');
          setAmount(stakeAmount.mul(percent).div(100));
          break;
      }
    },
    [stakeAmount, amount, setAmount],
  );

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Unstake Amount"
        total={stakeAmount}
        amount={amount}
        onOptionChange={handleOptionChange}
        onAmountChange={onAmountChange}
        disabled={disabled}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <Dialog
          title="Unstake Request Submitted"
          description="Your request has been submitted, check out staking history for details."
        >
          <Button size="lg">Submit</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
