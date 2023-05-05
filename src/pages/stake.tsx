import { Card } from '@/components/common/card';
import { Navigation } from '@/components/common/navigation';
import { Layout } from '@/components/layout';
import { useRouteQuery } from '@/hooks/useRouteQuery';
import React from 'react';

export enum StakeOpType {
  Add = 'add',
  Reedem = 'reedem',
  Withdraw = 'withdraw',
  History = 'history',
}

const NAVS = [
  {
    name: StakeOpType.Add,
    href: '/stake?op=add',
  },
  {
    name: StakeOpType.Reedem,
    href: '/stake?op=reedem',
  },
  {
    name: StakeOpType.Withdraw,
    href: '/stake?op=withdraw',
  },
  {
    name: StakeOpType.History,
    href: '/stake?op=history',
  },
];

function Stake() {
  const [op] = useRouteQuery('op', StakeOpType.Add);

  return (
    <Layout>
      <Card title={<Navigation navs={NAVS} active={op as string} />}>
        {op.toString()}
      </Card>
    </Layout>
  );
}

export default Stake;
