import { AuthResponseData, authWithPopup, verifyCredential } from '@joyid/core';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import React from 'react';

const joyIdAtom = atomWithStorage<AuthResponseData | undefined>(
  'joyid',
  undefined,
);

export function useJoyId() {
  const [joyId, setJoyId] = useAtom(joyIdAtom);
  const connected = React.useMemo(() => !!joyId, [joyId]);

  React.useEffect(() => {
    if (joyId === undefined) {
      return;
    }
    const { keyType, address, pubkey, alg } = joyId;
    verifyCredential(pubkey, address, keyType, alg).then((result) => {
      if (!result) {
        setJoyId(undefined);
        // TODO: show invaild credential error message
      }
    });
  }, [joyId, setJoyId]);

  const connect = React.useCallback(async () => {
    const { error, data } = await authWithPopup({
      redirectURL: location.origin + '/',
      name: 'Spark UI',
    });
    if (error === null) {
      setJoyId(data);
    } else {
      // TODO: show auth error message
    }
  }, [setJoyId]);

  return {
    joyId,
    connect,
    connected,
  };
}
