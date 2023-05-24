import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useCapacities, useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import EpochField from '../epoch-field';

export default function StakePanel() {
  const { capacities: total = BI.from(0), refresh, isSuccess } = useCapacities();
  const { connected } = useConnect({});
  const disabled = useMemo(
    () => !connected || !isSuccess,
    [connected, isSuccess],
  );
  const [amount, setAmount] = useState<BI>(total);

  useEffect(() => {
    if (connected) {
      refresh();
    }
  }, [connected, refresh]);

  useEffect(() => {
    if (isSuccess) {
      setAmount(total);
    }
  }, [isSuccess, total]);

  const handleOptionChange = useCallback(
    (option: string) => {
      switch (option) {
        case 'Custom':
          if (!amount.eq(total)) {
            setAmount(total);
          }
          break;
        default:
          const [percent] = option.split('%');
          setAmount(total.mul(percent).div(100));
          break;
      }
    },
    [total, amount],
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
        label="Stake Amount"
        total={total}
        amount={amount}
        onOptionChange={handleOptionChange}
        onAmountChange={handleAmountChange}
        disabled={disabled}
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
