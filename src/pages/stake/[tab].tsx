import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Card from '@/components/common/card';
import Navigation from '@/components/common/navigation';
import Layout from '@/components/layout';
import StakePanel from '@/components/stake/stake-panel';

export enum StakeOpType {
  Stake = 'stake',
  Unstake = 'unstake',
  Withdraw = 'withdraw',
  History = 'history',
}

const navs = [
  StakeOpType.Stake,
  StakeOpType.Unstake,
  StakeOpType.Withdraw,
  StakeOpType.History,
].map((name) => ({ name, href: `/stake/${name}` }));

export default function StakePage() {
  const router = useRouter();
  const tab = useMemo(
    () => (router.query.tab as string) ?? StakeOpType.Stake,
    [router.query.tab],
  );

  const tabIndex = useMemo(() => {
    return navs.findIndex(({ name }) => name === tab) || 0;
  }, [tab]);

  return (
    <Layout>
      <Card title={<Navigation navs={navs} active={tab} />}>
        <Tabs index={tabIndex}>
          <TabPanels>
            <TabPanel>
              <StakePanel />
            </TabPanel>
            <TabPanel>
              <p>unstake</p>
            </TabPanel>
            <TabPanel>
              <p>withdraw</p>
            </TabPanel>
            <TabPanel>
              <p>history</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Layout>
  );
}
