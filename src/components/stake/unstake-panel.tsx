import React, { useCallback, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Box, Flex } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import InputField from '../input-filed';

export default function UnstakePanel() {
  const { connected } = useConnect({});
  const disabled = useMemo(() => !connected, [connected]);
  const total = useMemo(() => BI.from(0), []);
  const [amount, setAmount] = useState<BI>(total);

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
        label="Unstake Amount"
        total={total}
        amount={amount}
        onOptionChange={handleOptionChange}
        onAmountChange={handleAmountChange}
        disabled={disabled}
      />
      <InputField label="Effective Epoch" value="2" disabled />
      <Flex justifyContent="center" marginBottom={10}>
        <Dialog
          title="Unstake Request Submitted"
          description="Your request has been submitted, check out staking history for details."
        >
          <Button>Submit</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
