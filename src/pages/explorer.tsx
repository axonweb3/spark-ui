import React, { useMemo } from 'react';
import Layout from '@/components/layout';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { OverviewChart } from '@/components/explorer/overview-chart';
import { AxonStatus } from '@/components/explorer/axon-status';
import Card from '@/components/common/card';
import { TopStakeAddresses } from '@/components/explorer/top-stake-addresses';
import { LatestTransactions } from '@/components/explorer/latest-transactions';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useStakeStatsQuery } from '@/hooks/query/useStakeStatsQuery';

export default function ExplorerPage() {
  const { isDelegator } = useStakeRole();
  const backgroundColor = useMemo(
    () => (isDelegator ? 'secondary' : 'primary'),
    [isDelegator],
  );

  const { data } = useStakeStatsQuery();
  const { stakeAmountByEpoch, chainState, topStakeAddresses } = data;

  return (
    <Layout>
      <SimpleGrid width="100%" marginX="auto" columns={2} gap="30px">
        <OverviewChart dataSource={stakeAmountByEpoch} />
        <AxonStatus dataSource={chainState} />
      </SimpleGrid>
      <Box marginTop="30px">
        <Card size="lg" backgroundColor={backgroundColor}>
          <TopStakeAddresses dataSource={topStakeAddresses} />
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
