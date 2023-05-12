import PWCore, { Collector, Provider } from '@lay2/pw-core';
import React, { useContext } from 'react';

export interface IPWCoreConfig {
  nodeUrl: string;
  provider: Provider;
  collector: Collector;
  autoConnect?: boolean;
}

export const PWCoreConfigContext = React.createContext<IPWCoreConfig | null>(null);

export function usePWCoreConfig() {
  const config = useContext(PWCoreConfigContext);
  return config;
}

export const PWCoreContext = React.createContext<PWCore | null>(null);

export function usePWCore() {
  const pwCore = useContext(PWCoreContext);
  return pwCore;
}
