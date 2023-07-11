import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Card from '@/components/common/card';
import Navigation from '@/components/common/navigation';
import Layout from '@/components/layout';
import DelegatePanel from '@/components/delegate/delegate-panel';
import UndelegatePanel from '@/components/delegate/undelegate-panel';
import WithdrawPanel from '@/components/delegate/withdraw-panel';
import HistoryPanel from '@/components/delegate/history-panel';
import { MdSettings } from 'react-icons/md';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';
import { useConnect } from '@/hooks/useConnect';

export enum DelegateTabType {
  Delegate = 'delegate',
  Undelegate = 'undelegate',
  Withdraw = 'withdraw',
  History = 'history',
}

const NAVS = [
  DelegateTabType.Delegate,
  DelegateTabType.Undelegate,
  DelegateTabType.Withdraw,
  DelegateTabType.History,
].map((name) => ({ name, href: `/delegate/${name}` }));

const panels = {
  [DelegateTabType.Delegate]: DelegatePanel,
  [DelegateTabType.Undelegate]: UndelegatePanel,
  [DelegateTabType.Withdraw]: WithdrawPanel,
  [DelegateTabType.History]: HistoryPanel,
};

export default function DelegatePage() {
  const router = useRouter();
  const { role } = useStakeRole();
  const { isConnected } = useConnect();
  const { isDelegator } = useStakeRole();
  const [navs, setNavs] = useState<typeof NAVS>(NAVS.filter(({ name }) => name === DelegateTabType.Delegate));
  const tab = useMemo(() => (router.query.tab as string) ?? DelegateTabType.Delegate, [router.query.tab]);

  useEffect(() => {
    if (isConnected) {
      setNavs(NAVS);
    }
  }, [isConnected]);

  const tabIndex = useMemo(() => {
    return navs.findIndex(({ name }) => name === tab) || 0;
  }, [tab, navs]);

  return (
    <Layout>
      <Card
        backgroundColor={isDelegator ? 'secondary' : 'primary'}
        title={
          <Flex alignItems="center">
            <Navigation navs={navs} active={tab} />
            {role === StakeRoleType.Delegator && (
              <>
                <Spacer />
                <Menu placement="bottom-end">
                  <MenuButton as={Box} cursor="pointer">
                    <Icon as={MdSettings} width="20px" height="20px" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push('/?redirect=false')}>Switch Role</MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>
        }
      >
        <Tabs index={tabIndex} isLazy>
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
