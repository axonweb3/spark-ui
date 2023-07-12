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
import * as cookie from 'cookie';
import React, { useEffect, useMemo, useState } from 'react';
import Card from '@/components/common/card';
import Navigation from '@/components/common/navigation';
import Layout from '@/components/layout';
import { MdSettings } from 'react-icons/md';
import StakePanel from '@/components/stake/stake-panel';
import UnstakePanel from '@/components/stake/unstake-panel';
import WithdrawPanel from '@/components/stake/withdraw-panel';
import HistoryPanel from '@/components/stake/history-panel';
import { NextPageContext } from 'next';
import { StakeRoleType } from '@/hooks/useStakeRole';
import { SPARK_ROLE_KEY } from '@/consts';
import { useConnect } from '@/hooks/useConnect';

export enum StakeTabType {
  Stake = 'stake',
  Unstake = 'unstake',
  Withdraw = 'withdraw',
  History = 'history',
}

const NAVS = [StakeTabType.Stake, StakeTabType.Unstake, StakeTabType.Withdraw, StakeTabType.History].map((name) => ({
  name,
  href: `/stake/${name}`,
}));

const panels = {
  [StakeTabType.Stake]: StakePanel,
  [StakeTabType.Unstake]: UnstakePanel,
  [StakeTabType.Withdraw]: WithdrawPanel,
  [StakeTabType.History]: HistoryPanel,
};

export function getServerSideProps(context: NextPageContext) {
  const cookies = cookie.parse(context.req?.headers.cookie ?? '');

  if (cookies[SPARK_ROLE_KEY] !== StakeRoleType.Validator) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
}

export default function StakePage() {
  const router = useRouter();
  const { isConnected } = useConnect();
  const [navs, setNavs] = useState<typeof NAVS>(NAVS.filter(({ name }) => name === StakeTabType.Stake));
  const tab = useMemo(() => (router.query.tab as string) ?? StakeTabType.Stake, [router.query.tab]);

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
        backgroundColor="primary"
        title={
          <Flex alignItems="center">
            <Navigation navs={navs} active={tab} />
            <Spacer />
            <Menu placement="bottom-end">
              <MenuButton as={Box} cursor="pointer" display="flex" flexDirection="column" justifyContent="center">
                <Icon as={MdSettings} width="20px" height="20px" />
              </MenuButton>
              <MenuList
                boxShadow="0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)"
                borderWidth="0px"
                borderRadius="4px"
              >
                <MenuItem
                  onClick={() => router.push('/stake/settings')}
                  fontSize="16px"
                  fontFamily="montserrat"
                  fontWeight="500"
                  paddingY="8px"
                  paddingX="16px"
                  _focus={{
                    backgroundColor: 'yellow.200',
                  }}
                >
                  Commission Rate
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        }
      >
        <Tabs index={tabIndex} isLazy>
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
