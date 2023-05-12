import React, { useState } from 'react';
import TextField from '@/components/common/text-field';
import SegmentedButton from '@/components/common/segmented-button';
import Button from '@/components/common/button';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import useAccount from '@/hooks/pw-core/accounts/useAccount';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export default function StakePanel() {
  const [option, setOption] = React.useState('Custom');
  const { balance } = useAccount();
  const [stakeAmount, setStakeAmount] = useState(balance.toString() ?? "0");

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
            value={option}
            onChange={setOption}
          />
          <Box marginTop={4} width="full">
            <TextField value={stakeAmount} onChange={setStakeAmount} />
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
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
}
