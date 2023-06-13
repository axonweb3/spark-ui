import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/common/button';
import Navigation from '@/components/common/navigation';
import allNavs from '@/navs';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';
import { useConnect } from '@/hooks/useConnect';

export interface IHeaderProps {
  logoOnly?: boolean;
}

export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const { connect, isConnected, address } = useConnect();
  const { role } = useStakeRole();

  const navs = useMemo(() => {
    if (role === StakeRoleType.Delegator) {
      return allNavs.filter(({ name }) => name !== 'Stake');
    }
    if (!isConnected) {
      return allNavs.filter(({ name }) => name !== 'Rewards');
    }
    return allNavs;
  }, [role, isConnected]);

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
              {isConnected ? (
                <Button
                  width="50"
                  variant="hovertext"
                >
                  {address?.slice(0, 10) + '...' + address?.slice(-10)}
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
