import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { encodeToAddress } from '@ckb-lumos/helpers';
import React from 'react';

type MethodNames =
  | 'wallet_enable'
  | 'wallet_fullOwnership_getLiveCells'
  | 'wallet_fullOwnership_getOffChainLocks'
  | 'wallet_fullOwnership_getOnChainLocks'
  | 'wallet_fullOwnership_signData'
  | 'wallet_fullOwnership_signTransaction';

declare global {
  interface Window {
    ckb: {
      request: (payload: { method: MethodNames; params?: any }) => Promise<any>;
    };
  }
}

function getNexusProvider() {
  if (typeof window === 'undefined') {
    return null;
  }
  const ckb = window?.ckb;
  if (!ckb) {
    return null;
  }
  return ckb;
}

const nicknameAtom = atomWithStorage<string | undefined>('nexus#nickname', undefined);
const addressAtom = atom<string | undefined>(undefined);

export function useNexus() {
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const ckb = React.useMemo(() => getNexusProvider(), []);
  const connected = React.useMemo(() => !!nickname, [nickname]);

  const connect = React.useCallback(async () => {
    if (!ckb) {
      // TODO: show nexus wallet not found error
    }

    const { nickname } = await ckb?.request({ method: 'wallet_enable' });
    setNickname(nickname);
    const [lock] = await window.ckb.request({
      method: 'wallet_fullOwnership_getOffChainLocks',
      params: { change: 'internal' }
    });
    setAddress(encodeToAddress(lock));
  }, [ckb, setNickname, setAddress]);

  React.useEffect(() => {
    if (nickname) {
      connect();
    }
  }, [nickname, connect]);

  return {
    ckb,
    address,
    connect,
    connected,
  };
}
