import React from 'react';
import { Button } from './common/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';

export const NAVIGATIONS = [
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

  return (
    <header>
      <div className="h-[70px] bg-secondary">
        <div className="flex flex-row justify-between items-center container mx-auto">
          <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
          <div className="flex flex-row items-center">
            {NAVIGATIONS.map(({ name, href }) => (
              <div
                key={name}
                className={classnames('px-[24px] py-[8px] mx-[6px]', {
                  'bg-brand border border-grey-700 rounded-md': router.pathname === href,
                })}
              >
                <Link href={href} className="font-alfarn-2 text-lg font-bold leading-5">
                  {name}
                </Link>
              </div>
            ))}
          </div>
          <Button label="Connect Wallet" />
        </div>
      </div>
    </header>
  );
}
