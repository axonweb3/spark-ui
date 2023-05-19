import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@/components/common/text-field';
import SegmentedButton from '@/components/common/segmented-button';
import Button from '@/components/common/button';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import { useCapacities } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export default function StakePanel() {
  const { capacities = BI.from(0) } = useCapacities();
  const [amount, setAmount] = useState<BI>(capacities);
  const [custom, setCustom] = useState(true);

  const percent = useMemo(() => {
    if (capacities.eq(0)) {
      return '0';
    }
    return amount.mul(100).div(capacities).toString();
  }, [amount, capacities]);

  const handleOptionChange = useCallback(
    (option: string) => {
      switch (option) {
        case 'Custom':
          if (!amount.eq(capacities)) {
            setAmount(capacities);
          }
          break;
        default:
          const [percent] = option.split('%');
          setAmount(capacities.mul(percent).div(100));
          break;
      }
      setCustom(option === 'Custom');
    },
    [capacities, amount],
  );

  const handleAmountChange = useCallback((amount: string) => {
    setCustom(true);
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

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <Flex marginBottom={14}>
        <Flex height={12} alignItems="center">
          <Text fontWeight="extrabold">Token Amount</Text>
        </Flex>
        <Spacer />
        <Box>
          <SegmentedButton
            options={AMOUNT_OPTIONS}
            value={custom ? 'Custom' : `${percent}%`}
            onChange={handleOptionChange}
          />
          <Box marginTop={4} width="full">
            <TextField
              type="number"
              value={(amount.toNumber() / 10 ** 8).toString()}
              onChange={handleAmountChange}
              rightAddon={
                <Flex
                  width={20}
                  height="full"
                  backgroundColor="secondary"
                  alignItems="center"
                  borderRightRadius="6px"
                  paddingX={2}
                >
                  <Text>≈ {percent}%</Text>
                </Flex>
              }
            />
          </Box>
        </Box>
      </Flex>
      <Flex marginBottom={14}>
        <Flex height={12} alignItems="center">
          <Text fontWeight="extrabold">Effective Epoch</Text>
        </Flex>
        <Spacer />
        <Flex width="550px" justifyContent="start">
          <Box width="full">
            <TextField value={'2'} disabled />
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent="center" marginBottom={10}>
        <Dialog
          title="Staking Submitted"
          description="Your transaction is already submitted, please check out the stake history later."
        >
          <Button>Submit</Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
