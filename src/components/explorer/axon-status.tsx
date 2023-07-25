import { Box, SimpleGrid, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import Card from '../common/card';
import { useMemo } from 'react';
import { useStakeRole } from '@/hooks/useStakeRole';
import { trpc } from '@/server';

const BOX_STYLES = {
  backgroundColor: 'white',
  paddingX: '30px',
  paddingY: '20px',
  borderWidth: '0.5px',
  borderColor: 'black',
  borderRadius: '16px',
};

export function AxonStatus() {
  const { isDelegator } = useStakeRole();
  const backgroundColor = useMemo(() => (isDelegator ? 'secondary' : 'primary'), [isDelegator]);
  const { data } = trpc.stats.chain.useQuery();
  const { epoch = 0, period = 0, block_number = 0, total_stake_amount = 0 } = data ?? {};

  return (
    <Box width="full">
      <Card backgroundColor={backgroundColor}>
        <Box paddingBottom="10px">
          <Text fontFamily="alfarn-2" fontSize="18px" fontWeight="semibold" marginX="-12px" marginBottom={4}>
            Axon Status
          </Text>
          <SimpleGrid columns={2} gap="20px" marginX="-12px">
            <Box {...BOX_STYLES}>
              <Stat>
                <StatLabel fontFamily="montserrat" fontWeight="bold">
                  Epoch
                </StatLabel>
                <StatNumber fontFamily="montserrat" fontWeight="semibold" fontSize="36px">
                  {epoch}
                </StatNumber>
              </Stat>
            </Box>
            <Box {...BOX_STYLES}>
              <Stat>
                <StatLabel fontFamily="montserrat" fontWeight="bold">
                  Period
                </StatLabel>
                <StatNumber fontFamily="montserrat" fontWeight="semibold" fontSize="36px">
                  {period}
                </StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
          <Box {...BOX_STYLES} marginTop="20px" marginX="-12px">
            <Stat>
              <StatLabel fontFamily="montserrat" fontWeight="bold">
                Block Number
              </StatLabel>
              <StatNumber fontFamily="montserrat" fontWeight="semibold" fontSize="36px">
                {block_number}
              </StatNumber>
            </Stat>
          </Box>
          <Box {...BOX_STYLES} marginTop="20px" marginX="-12px">
            <Stat>
              <StatLabel fontFamily="montserrat" fontWeight="bold">
                Total Stake Amount
              </StatLabel>
              <StatNumber fontFamily="montserrat" fontWeight="semibold" fontSize="36px">
                {total_stake_amount}
              </StatNumber>
            </Stat>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
