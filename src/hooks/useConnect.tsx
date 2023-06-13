import { commons, helpers } from '@ckb-lumos/lumos';
import { useEffect, useMemo } from 'react';
import { useAccount, useConnect as useWagmiConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useDialog } from './ui/useDialog';

export function useConnect() {
  const showDialog = useDialog();
  const { connect, error, isLoading } = useWagmiConnect({
    connector: new InjectedConnector(),
  });
  const { address: ethAddress, isConnected, isDisconnected } = useAccount();

  const address = useMemo(() => {
    if (ethAddress === undefined) {
      return undefined;
    }
    const omniLockScript = commons.omnilock.createOmnilockScript({
      auth: { flag: 'ETHEREUM', content: ethAddress },
    });
    return helpers.encodeToAddress(omniLockScript);
  }, [ethAddress]);

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
    address,
    ethAddress,
  };
}
