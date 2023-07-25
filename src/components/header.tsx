import React, { useDeferredValue, useMemo } from 'react';
import Button from '@/components/common/button';
import { Box, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { useConnect } from '@/hooks/useConnect';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useAddressCopy } from '@/hooks/useAddressCopy';

export default function Header() {
  const { connect, isConnected, address } = useConnect();
  const { role } = useStakeRole();
  const { onCopy } = useAddressCopy();
  const deferredAddress = useDeferredValue(address);
  const displayAddress = useMemo(
    () => deferredAddress?.slice(0, 6) + '...' + deferredAddress?.slice(-6),
    [deferredAddress],
  );

  return (
    <header>
      <Box maxWidth="1080px" paddingX={4} marginX="auto">
        <Flex backgroundColor="transparent" alignItems="center" paddingTop="10px" marginBottom="24px">
          <Box>
            <Text fontSize="22px" fontFamily="alfarn-2" fontWeight="bold">
              {role === 'delegator' ? 'Delegator' : 'Validator'}
            </Text>
          </Box>
          <Spacer />
          {isConnected ? (
            <Tooltip label="Copy to clipboard" hasArrow>
              <Box>
                <Button width="50" variant="outlined" onClick={onCopy}>
                  {displayAddress}
                </Button>
              </Box>
            </Tooltip>
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
