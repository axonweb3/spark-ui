import React from 'react';
import { Header } from './header';

export function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-secondary min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto my-9">
        {props.children}
        </div>
      </main>
    </div>
  );
}
