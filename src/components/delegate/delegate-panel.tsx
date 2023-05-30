import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Text, Box, Flex, Divider } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import InputField from '../input-filed';
import EpochField from '../epoch-field';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import { useAmountState } from '@/hooks/useAmountState';

export default function DelegatePanel() {
  const { connected, address } = useConnect();
  const disabled = useMemo(() => !connected, [connected]);
  const { isLoading, availableAmount } = useStakeAmountQuery(address);
  const { amount, setAmount, onAmountChange } = useAmountState(availableAmount);

  useEffect(() => {
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
      <InputField
        label="Delegate To"
        placeholder="Please add your address here"
      />
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
          title="Delegation Information"
          description={
            <Box>
              <Box fontFamily="montserrat" marginBottom={4}>
                <Text fontWeight="medium" marginRight={2}>
                  Delegate Address:
                </Text>
                <Text fontWeight="normal">
                  0x1234abcd5678efgh9012ijkl3456mnop7890qrst
                </Text>
              </Box>
              <Flex fontFamily="montserrat">
                <Text fontWeight="medium" marginRight={2}>
                  Commission Rate:
                </Text>
                <Text fontWeight="normal">3.5%</Text>
              </Flex>
              <Divider marginY="18px" backgroundColor="grey.200" />
              <Flex fontFamily="montserrat">
                <Text fontWeight="medium" marginRight={2}>
                  Minimum Amount:
                </Text>
                <Text fontWeight="normal">10,000 AT</Text>
              </Flex>
            </Box>
          }
          cancelLabel="Redelegate"
        >
          <Button size="lg">Submit</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
