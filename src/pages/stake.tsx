import { Card } from '@/components/common/card';
import { Navigation } from '@/components/common/navigation';
import { Layout } from '@/components/layout';
import { StakeForm } from '@/components/stake-form';
import { useRouteQuery } from '@/hooks/useRouteQuery';
import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';

export enum StakeOpType {
  Stake = 'Stake',
  Unstake = 'Unstake',
  Withdraw = 'Withdraw',
  History = 'History',
}

const NAVS = [
  StakeOpType.Stake,
  StakeOpType.Unstake,
  StakeOpType.Withdraw,
  StakeOpType.History,
].map((name) => ({ name, href: `/stake?tab=${name}`}));

function Stake() {
  const [tab] = useRouteQuery('tab', StakeOpType.Stake);

  return (
    <Layout>
      <Card title={<Navigation navs={NAVS} active={tab} />}>
        <Tabs.Root value={tab}>
          <Tabs.Content value={StakeOpType.Stake}>
            <StakeForm />
          </Tabs.Content>
          <Tabs.Content value={StakeOpType.Unstake}>
            StakeOpType.Redeem
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </Layout>
  );
}

export default Stake;
