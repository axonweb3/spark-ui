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
  const { nodeUrl } = config;

  useEffect(() => {
    const init = async () => {
      const pwCore = new PWCore(nodeUrl);
      setPWCore(pwCore);
    };
    init();
  }, [nodeUrl]);

  useEffect(() => {
    const { autoConnect, provider, collector } = config;
    if (autoConnect) {
      pwCore?.init(provider, collector);
    }
  }, [config, pwCore]);

  return (
    <PWCoreConfigContext.Provider value={config}>
      <PWCoreContext.Provider value={pwCore}>{children}</PWCoreContext.Provider>
    </PWCoreConfigContext.Provider>
  );
};
