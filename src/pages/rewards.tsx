import React, { useState } from 'react';
import Card from '@/components/common/card';
import Layout from '@/components/layout';
import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SegmentedButton from '@/components/common/segmented-button';
import { RewardStats } from '@/components/rewards/reward-stats';
import { RewardsHistory } from '@/components/rewards/rewards-history';
import { WithdrawalHistory } from '@/components/rewards/withdrawal-history';
import { useStakeRole } from '@/hooks/useStakeRole';

const tabs = [
  {
    name: 'Rewards History',
    component: <RewardsHistory />,
  },
  {
    name: 'Withdrawal History',
    component: <WithdrawalHistory />,
  },
];

export default function RewardsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const { isDelegator } = useStakeRole();

  return (
    <Layout>
      <RewardStats />
      <Box height="30px" />
      <Card size="lg" backgroundColor={isDelegator ? 'secondary' : 'primary'}>
        <Box paddingY="30px" paddingX="32px">
          <Flex justifyContent="center" marginBottom="30px">
            <Box width="420px">
              <SegmentedButton
                options={tabs.map(({ name }) => name)}
                onChange={(val) => {
                  const index = tabs.findIndex(({ name }) => name === val);
                  setTabIndex(index ?? 0);
                }}
              />
            </Box>
          </Flex>
          <Tabs index={tabIndex} isLazy>
            <TabPanels>
              {tabs.map(({ name, component }) => {
                return <TabPanel key={name}>{component}</TabPanel>;
              })}
            </TabPanels>
          </Tabs>
        </Box>
      </Card>
    </Layout>
  );
}
