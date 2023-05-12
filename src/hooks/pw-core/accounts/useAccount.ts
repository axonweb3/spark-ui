import { useCallback, useMemo } from 'react';
import PWCore, { Address, AddressType } from '@lay2/pw-core';
import { usePWCore, usePWCoreConfig } from '../context';
import { useLocalStorage } from 'react-use';

export default function useAccount() {
  const pwCore = usePWCore();
  const config = usePWCoreConfig();
  const [address, setAddress, removeAddress] = useLocalStorage<Address>('pw-core-account', undefined);
  const connected = useMemo(() => !!address, [address]);

  const connect = useCallback(async () => {
    if (pwCore && config) {
      const { provider, collector } = config!;
      await pwCore.init(provider, collector);
      setAddress(PWCore.provider!.address);
    }
  }, [pwCore, config, setAddress]);

  const disconnect = useCallback(() => {
    removeAddress()
  }, [removeAddress]);

  return {
    connect,
    disconnect,
    connected,
    address,
  };
}
