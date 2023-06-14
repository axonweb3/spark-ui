import React, { useMemo } from 'react';
import Layout from '@/components/layout';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { OverviewChart } from '@/components/explorer/overview-chart';
import { AxonStatus } from '@/components/explorer/axon-status';
import Card from '@/components/common/card';
import { TopStakeAddresses } from '@/components/explorer/top-stake-addresses';
import { LatestTransactions } from '@/components/explorer/latest-transactions';
import { useStakeRole } from '@/hooks/useStakeRole';

export default function ExplorerPage() {
  const { isDelegator } = useStakeRole();
  const backgroundColor= useMemo(() => isDelegator ? "secondary" : "primary", [isDelegator]);

  return (
    <Layout>
      <SimpleGrid
        width="100%"
        maxWidth="1280px"
        marginX="auto"
        columns={2}
        gap="30px"
      >
        <Box width="full">
          <OverviewChart />
        </Box>
        <Box width="full">
          <AxonStatus />
        </Box>
      </SimpleGrid>
      <Box marginTop="30px">
        <Card size="lg" backgroundColor={backgroundColor}>
          <TopStakeAddresses />
        </Card>
      </Box>
      <Box marginTop="30px">
        <Card size="lg" backgroundColor={backgroundColor}>
          <LatestTransactions />
        </Card>
      </Box>
    </Layout>
  );
}
