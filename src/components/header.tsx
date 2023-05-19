import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/common/button';
import Navigation from '@/components/common/navigation';
import navs from '@/navs';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import {
  MetaMaskConnector,
  useConnect,
  useDisconnect,
} from '@spinal-ckb/react';

export default function Header() {
  const router = useRouter();
  const connector = useMemo(() => new MetaMaskConnector(), []);
  const { connect, connected, address } = useConnect({
    connector,
  });
  const { disconnect } = useDisconnect();

  // FIXME
  useEffect(() => {
    setTimeout(() => {
      connect();
    }, 300);
  }, [connect]);

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
              {address?.slice(0, 10) + '...' + address?.slice(-10)}
            </Button>
          ) : (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          )}
        </Flex>
      </Container>
    </header>
  );
}
