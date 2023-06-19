import { commons, config, helpers } from '@ckb-lumos/lumos';
import { useEffect } from 'react';
import { useAccount, useConnect as useWagmiConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useDialog } from './ui/useDialog';
import { SPART_ADDRESS_KEY } from '@/consts';
import { useCookie, useMount } from 'react-use';

export function useConnect(params: Parameters<typeof useWagmiConnect>[0] = {}) {
  const showDialog = useDialog();
  const [address, setAddress, delAddress] = useCookie(SPART_ADDRESS_KEY);
  const { connect, error, isLoading } = useWagmiConnect({
    connector: new InjectedConnector(),
    ...params,
  });
  const {
    address: ethAddress,
    isConnected,
    isDisconnected,
  } = useAccount({
    onConnect({ address }) {
      const omniLockScript = commons.omnilock.createOmnilockScript({
        auth: { flag: 'ETHEREUM', content: address! },
      });
      const addr = helpers.encodeToAddress(omniLockScript, {
        config: process.env.PRODUCTION_MODE
          ? config.predefined.LINA
          : config.predefined.AGGRON4,
      });
      setAddress(addr);
    },
    onDisconnect() {
      console.log('onDisconnect');
      delAddress();
    },
  });

  useMount(() => {
    console.log('mount');
    if (address && isDisconnected) {
      connect();
    }
  });

  useEffect(() => {
    if (error) {
      showDialog({
        title: 'Failed to Connect',
        description: error?.message,
        hideCancel: true,
      });
    }
  }, [error, showDialog]);

  return {
    connect,
    isConnected,
    isLoading,
    isDisconnected,
    error,
    address: address || undefined,
    ethAddress,
  };
}
