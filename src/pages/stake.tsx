import { Card } from '@/components/common/card';
import { Navigation } from '@/components/common/navigation';
import { Layout } from '@/components/layout';
import { StakeForm } from '@/components/stake-form';
import { useRouteQuery } from '@/hooks/useRouteQuery';
import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';

export enum StakeOpType {
  Add = 'add',
  Reedem = 'reedem',
  Withdraw = 'withdraw',
  History = 'history',
}

const NAVS = [
  StakeOpType.Add,
  StakeOpType.Reedem,
  StakeOpType.Withdraw,
  StakeOpType.History,
].map((name) => ({ name, href: `/stake?op=${name}`}));

function Stake() {
  const [op] = useRouteQuery('op', StakeOpType.Add);

  return (
    <Layout>
      <Card title={<Navigation navs={NAVS} active={op as string} />}>
        <Tabs.Root value={op as string}>
          <Tabs.Content value={StakeOpType.Add}>
            <StakeForm />
          </Tabs.Content>
          <Tabs.Content value={StakeOpType.Reedem}>
            StakeOpType.Reedem
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </Layout>
  );
}

export default Stake;
