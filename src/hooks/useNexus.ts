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

export function useNexus() {
  const ckb = React.useMemo(() => getNexusProvider(), []);

  const connect = React.useCallback(async () => {
    if (!ckb) {
      // TODO: show nexus wallet not found error
    }

    // XXX: wallet_enable method not return CKB address
    // nexus must be support method like `eth_accounts` in metamask
    await ckb?.request({ method: 'wallet_enable' });
  }, [ckb]);

  return {
    ckb,
    connect,
  };
}
