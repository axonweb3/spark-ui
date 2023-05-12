import { useCallback, useEffect, useState } from 'react';
import PWCore, { Amount } from '@lay2/pw-core';
import { usePWCore, usePWCoreConfig } from '../context';
import useAddress from './useAddress';

export default function useAccount() {
  const pwCore = usePWCore();
  const config = usePWCoreConfig();
  const { address, ethAddress, ckbAddress, setAddress, removeAddress } =
    useAddress();
  // TODO: get ckb balance from lumos indexer
  const [balance, setBlance] = useState(new Amount('0'));
  const [connected, setConnected] = useState(false);

  const connect = useCallback(async () => {
    if (pwCore && config) {
      const { provider, collector } = config!;
      await pwCore.init(provider, collector);
      setAddress(PWCore.provider!.address);
      setConnected(true);
    }
  }, [pwCore, config, setAddress]);

  const disconnect = useCallback(() => {
    removeAddress();
    setConnected(false);
  }, [removeAddress]);

  useEffect(() => {
    if (address && !connected) {
      connect();
    }
  }, [address, connect, connected]);

  return {
    connect,
    disconnect,
    connected,
    address,
    ethAddress,
    ckbAddress,
    balance,
  };
}
