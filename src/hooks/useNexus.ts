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

const nicknameAtom = atomWithStorage<string | undefined>(
  'nexus#nickname',
  undefined,
);
const addressAtom = atom<string | undefined>(undefined);

export function useNexus() {
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const ckb = React.useMemo(() => getNexusProvider(), []);
  const connected = React.useMemo(() => !!nickname, [nickname]);

  const connect = React.useCallback(async () => {
    if (!ckb) {
      // TODO: show nexus wallet not found error
      return;
    }

    const { nickname } = await ckb?.request({ method: 'wallet_enable' });
    setNickname(nickname);
    const [lock] = await window.ckb.request({
      method: 'wallet_fullOwnership_getOffChainLocks',
      params: { change: 'external' },
    });
    setAddress(encodeToAddress(lock));
  }, [ckb, setNickname, setAddress]);

  React.useEffect(() => {
    if (connected) {
      connect();
    }
  }, [connected, connect]);

  const getAllLiveCells = React.useCallback(async () => {
    if (!ckb) {
      // TODO: show nexus wallet not found error
      return;
    }

    const cells = [];
    let response = await ckb.request({
      method: 'wallet_fullOwnership_getLiveCells',
      params: {},
    });
    cells.push(...(response.objects ?? []));

    while (response.cursor) {
      response = await ckb.request({
        method: 'wallet_fullOwnership_getLiveCells',
        params: { cursor: response.cursor },
      });
      cells.push(...(response.objects ?? []));
    }
  }, [ckb]);

  return {
    ckb,
    address,
    nickname,
    connect,
    connected,
    getAllLiveCells,
  };
}
