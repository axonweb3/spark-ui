import React, { useEffect, useState } from 'react';
import PWCore from '@lay2/pw-core';
import { IPWCoreConfig, PWCoreConfigContext, PWCoreContext } from './context';

export const PWCoreProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: IPWCoreConfig;
}) => {
  const [pwCore, setPWCore] = useState<PWCore | null>(null);

  useEffect(() => {
    const { nodeUrl } = config;
    const init = async () => {
      const pwCore = new PWCore(nodeUrl);
      setPWCore(pwCore);
    };
    init();
  }, [config]);

  return (
    <PWCoreConfigContext.Provider value={config}>
      <PWCoreContext.Provider value={pwCore}>{children}</PWCoreContext.Provider>
    </PWCoreConfigContext.Provider>
  );
};
