import React from 'react';
import Button from '@/components/common/button';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import { useConnect } from '@/hooks/useConnect';
import { useStakeRole } from '@/hooks/useStakeRole';

export default function Header() {
  const { connect, isConnected, address } = useConnect();
  const { role } = useStakeRole();

  return (
    <header>
      <Box maxWidth="1080px" marginX="auto">
        <Flex
          backgroundColor="transparent"
          alignItems="center"
          paddingTop="10px"
          marginBottom="24px"
        >
          <Box>
            <Text fontSize="22px" fontFamily="alfarn-2" fontWeight="bold">
              {role === 'delegator' ? 'Delegator' : 'Validator'}
            </Text>
          </Box>
          <Spacer />
          {isConnected ? (
            <Button width="50" variant="outlined">
              {address?.slice(0, 10) + '...' + address?.slice(-10)}
            </Button>
          ) : (
            <Button width="50" onClick={() => connect()}>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Box>
    </header>
  );
}
