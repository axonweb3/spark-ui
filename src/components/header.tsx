import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/common/button';
import Navigation from '@/components/common/navigation';
import allNavs from '@/navs';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import { useConnect, useDisconnect } from 'ckb-hooks';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';

export interface IHeaderProps {
  logoOnly?: boolean;
}

export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const { connect, connected, address } = useConnect({});
  const { role } = useStakeRole();
  const { disconnect } = useDisconnect();

  const navs = useMemo(() => {
    if (role === StakeRoleType.Delegator) {
      return allNavs.filter(({ name }) => name !== 'Stake');
    }
    if (!connected) {
      return allNavs.filter(({ name }) => name !== 'Rewards');
    }
    return allNavs;
  }, [role, connected]);

  const active = React.useMemo(() => {
    const nav = navs.find(({ href }) => router.pathname.startsWith(href));
    return nav?.name;
  }, [router.pathname, navs]);

  return (
    <header>
      <Container maxW="1440px">
        <Flex height="84px" backgroundColor="transparent" alignItems="center">
          <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
          <Spacer />
          {!props.logoOnly && (
            <>
              <Navigation navs={navs} active={active} />
              <Spacer />
              {connected ? (
                <Button
                  width="50"
                  variant="outlined"
                  onClick={() => disconnect()}
                >
                  {address?.slice(0, 6) + '..' + address?.slice(-7)}
                </Button>
              ) : (
                <Button width="50" onClick={() => connect()}>
                  Connect Wallet
                </Button>
              )}
            </>
          )}
        </Flex>
      </Container>
    </header>
  );
}
