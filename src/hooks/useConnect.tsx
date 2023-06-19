import { commons, config, helpers } from '@ckb-lumos/lumos';
import { useAccount, useConnect as useWagmiConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useDialog } from './ui/useDialog';
import { SPART_ADDRESS_KEY } from '@/consts';
import { useCookie, useMount } from 'react-use';

export function useConnect(params: Parameters<typeof useWagmiConnect>[0] = {}) {
  const showDialog = useDialog();
  const [address, setAddress, delAddress] = useCookie(SPART_ADDRESS_KEY);
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
      delAddress();
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
    address: address || undefined,
    ethAddress,
  };
}
