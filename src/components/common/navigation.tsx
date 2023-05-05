import classnames from 'classnames';
import Link from 'next/link';
import React from 'react';

export interface INavigationItem {
  name: string;
  href: string;
}

export interface INavigationProps {
  navs: INavigationItem[];
  active?: string;
}

export function Navigation(props: INavigationProps) {
  const { navs, active } = props;

  return (
    <div className="flex flex-row items-center">
      {navs.map(({ name, href }, index) => (
        <div
          key={name}
          className={classnames('px-[24px] py-[8px]', {
            'bg-brand border border-grey-700 rounded-md': name === active,
            'mr-[6px]': index !== navs.length - 1,
          })}
        >
          <Link
            href={href}
            className="font-alfarn-2 text-lg font-bold leading-5"
          >
            {name}
          </Link>
        </div>
      ))}
    </div>
  );
}
