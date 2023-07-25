import { useAccount, useConnect as useWagmiConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useDialog } from './ui/useDialog';
import { useMount } from 'react-use';
import { addressAtom } from '@/state/address';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

export function useConnect(params: Parameters<typeof useWagmiConnect>[0] = {}) {
  const showDialog = useDialog();
  const [address, setAddress] = useAtom(addressAtom);
  const { connect, isLoading } = useWagmiConnect({
    connector: new InjectedConnector(),
    onError(error) {
      const [message] = error.message.split('\n');
      showDialog({
        title: 'Failed to Connect',
        description: message,
        hideCancel: true,
      });
    },
    ...params,
  });
  const {
    address: ethAddress,
    isConnected,
    isDisconnected,
  } = useAccount({
    async onConnect({ address }) {
      if (address === undefined) return;
      setAddress(address);
    },
    onDisconnect() {
      setAddress(RESET);
    },
  });

  useMount(() => {
    if (address && isDisconnected) {
      connect();
    }
  });

  return {
    connect,
    isConnected,
    isLoading,
    isDisconnected,
    address: ethAddress,
  };
}
