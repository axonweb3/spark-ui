import {
  Text,
  Box,
  Flex,
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
import React, { useMemo } from 'react';
import Card from '@/components/common/card';
import Navigation from '@/components/common/navigation';
import Layout from '@/components/layout';
import { Icon } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import StakePanel from '@/components/stake/stake-panel';
import UnstakePanel from '@/components/stake/unstake-panel';
import WithdrawPanel from '@/components/stake/withdraw-panel';
import HistoryPanel from '@/components/stake/history-panel';

export enum StakeTabType {
  Stake = 'stake',
  Unstake = 'unstake',
  Withdraw = 'withdraw',
  History = 'history',
}

const navs = [
  StakeTabType.Stake,
  StakeTabType.Unstake,
  StakeTabType.Withdraw,
  StakeTabType.History,
].map((name) => ({ name, href: `/stake/${name}` }));

const panels = {
  [StakeTabType.Stake]: StakePanel,
  [StakeTabType.Unstake]: UnstakePanel,
  [StakeTabType.Withdraw]: WithdrawPanel,
  [StakeTabType.History]: HistoryPanel,
};

export default function StakePage() {
  const router = useRouter();
  const tab = useMemo(
    () => (router.query.tab as string) ?? StakeTabType.Stake,
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
            <Spacer />
            <Menu placement="bottom-end">
              <MenuButton as={Box} cursor="pointer">
                <Icon as={MdSettings} width="20px" height="20px" />
              </MenuButton>
              <MenuList>
                <MenuItem>Commission Rate</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        }
      >
        <Tabs index={tabIndex}>
          <TabPanels>
            {navs.map(({ name }, index) => {
              const Panel = panels[name] as () => React.ReactElement;
              return (
                <TabPanel key={`stake_panel_${index}`}>
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
