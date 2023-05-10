import React from 'react';
import { Button } from './common/button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Navigation } from './common/navigation';
import { useConnect, NexusConnentor } from '@spinal/react';

export const NAVS = [
  {
    name: 'Stake',
    href: '/stake',
  },
  {
    name: 'Delegate',
    href: '/delegate',
  },
  {
    name: 'Rewards',
    href: '/rewards',
  },
  {
    name: 'Explorer',
    href: '/explorer',
  },
];

export function Header() {
  const router = useRouter();
  const { address, connected, connect } = useConnect({
    connector: new NexusConnentor(),
  });

  const active = React.useMemo(() => {
    const nav = NAVS.find(({ href }) => href === router.pathname);
    return nav?.name;
  }, [router.pathname]);

  return (
    <header>
      <div className="h-[84px] bg-secondary flex flex-row justify-between items-center container mx-auto">
        <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
        <Navigation navs={NAVS} active={active} />
        {connected ? (
          <Button
            variant="text"
            label={address?.substring(0, 10)!}
          />
        ) : (
          <Button label="Connect Wallet" onClick={() => connect()} />
        )}
      </div>
    </header>
  );
}
