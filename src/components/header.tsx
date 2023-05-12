import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/common/button';
import Navigation from '@/components/common/navigation';
import navs from '@/navs';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import useAccount from '@/hooks/pw-core/accounts/useAccount';

export default function Header() {
  const router = useRouter();
  const { connect, disconnect, ethAddress, connected } =
    useAccount();

  const active = React.useMemo(() => {
    const nav = navs.find(({ href }) => router.pathname.startsWith(href));
    return nav?.name;
  }, [router.pathname]);

  return (
    <header>
      <Container maxW="1440px">
        <Flex height="84px" backgroundColor="secondary" alignItems="center">
          <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
          <Spacer />
          <Navigation navs={navs} active={active} />
          <Spacer />
          {connected ? (
            <Button variant="text" onClick={() => disconnect()}>
              {ethAddress?.slice(0, 10)}
            </Button>
          ) : (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          )}
        </Flex>
      </Container>
    </header>
  );
}
