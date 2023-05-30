import React, { useCallback, useMemo } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useAmountState } from '@/hooks/useAmountState';

export default function StakePanel() {
  const { connected, address } = useConnect();
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, availableAmount } = useStakeAmountQuery(address);
  const { amount, setAmount, onAmountChange } = useAmountState(availableAmount);

  React.useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, availableAmount, setAmount]);

  const handleOptionChange = useCallback(
    (option: string) => {
      switch (option) {
        case 'Custom':
          if (!amount.eq(availableAmount)) {
            setAmount(availableAmount);
          }
          break;
        default:
          const [percent] = option.split('%');
          setAmount(availableAmount.mul(percent).div(100));
          break;
      }
    },
    [availableAmount, amount, setAmount],
  );

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Stake Amount"
        total={availableAmount}
        amount={amount}
        onOptionChange={handleOptionChange}
        onAmountChange={onAmountChange}
        disabled={disabled}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <Dialog
          title="Staking Submitted"
          description="Your transaction is already submitted, please check out the stake history later."
        >
          <Button size="lg">Submit</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
