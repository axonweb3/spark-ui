import { Text, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Card from '@/components/common/card';
import Navigation from '@/components/common/navigation';
import Layout from '@/components/layout';
import DelegatePanel from '@/components/delegate/delegate-panel';

export enum DelegateTabType {
  Delegate = 'delegate',
  Undelegate = 'undelegate',
  Withdraw = 'withdraw',
  History = 'history',
}

const navs = [
  DelegateTabType.Delegate,
  DelegateTabType.Undelegate,
  DelegateTabType.Withdraw,
  DelegateTabType.History,
].map((name) => ({ name, href: `/delegate/${name}` }));

const panels = {
  [DelegateTabType.Delegate]: DelegatePanel,
  [DelegateTabType.Undelegate]: () => <Text>TODO</Text>,
  [DelegateTabType.Withdraw]: () => <Text>TODO</Text>,
  [DelegateTabType.History]: () => <Text>TODO</Text>,
};

export default function DelegatePage() {
  const router = useRouter();
  const tab = useMemo(
    () => (router.query.tab as string) ?? DelegateTabType.Delegate,
    [router.query.tab],
  );

  const tabIndex = useMemo(() => {
    return navs.findIndex(({ name }) => name === tab) || 0;
  }, [tab]);

  return (
    <Layout>
      <Card
        title={
          <Flex alignItems="center">
            <Navigation navs={navs} active={tab} />
          </Flex>
        }
      >
        <Tabs index={tabIndex}>
          <TabPanels>
            {navs.map(({ name }, index) => {
              const Panel = panels[name];
              return (
                <TabPanel key={`delegate_panel_${index}`}>
                  <Panel />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Card>
    </Layout>
  );
}
