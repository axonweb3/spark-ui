import React, { useCallback, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';
import { useAmountQuery } from '@/hooks/useAmountQuery';

export default function UnstakePanel() {
  const { connected, address } = useConnect({});
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, stakeAmount } = useAmountQuery(address);
  const [amount, setAmount] = useState<BI>(stakeAmount);

  React.useEffect(() => {
    if (!stakeAmount.isZero()) {
      setAmount(stakeAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, stakeAmount]);

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
    [stakeAmount, amount],
  );

  const handleAmountChange = useCallback((amount: string) => {
    if (amount === '') {
      setAmount(BI.from(0));
      return;
    }
    const [_, int, dec = '.0'] = amount.match(/^(\d+)(\.\d+)?$/)!;
    const amountBI = BI.from(int)
      .mul(10 ** 8)
      .add(BI.from(dec.slice(1)).mul(10 ** (9 - dec.length)));
    setAmount(amountBI);
  }, []);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <AmountField
        label="Unstake Amount"
        total={stakeAmount}
        amount={amount}
        onOptionChange={handleOptionChange}
        onAmountChange={handleAmountChange}
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
