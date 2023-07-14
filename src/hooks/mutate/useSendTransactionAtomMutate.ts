import { CellDep, RawTransaction, Transaction, commons, config } from '@ckb-lumos/lumos';
import { blockchain } from '@ckb-lumos/base';
import { bytes } from '@ckb-lumos/codec';
import { WritableAtom, useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import transaction from './transaction.mock.json';
import { signMessage } from '@wagmi/core';
import { omit } from 'lodash-es';
import camelcaseKeys from 'camelcase-keys';

type ScriptName = keyof (typeof config.predefined.AGGRON4)['SCRIPTS'];

export function getScriptCellDep(name: ScriptName): CellDep {
  const script = config.predefined.AGGRON4['SCRIPTS'][name];
  return {
    outPoint: {
      txHash: script!.TX_HASH,
      index: script!.INDEX,
    },
    depType: script!.DEP_TYPE,
  };
}

export function useSendTransactionAtomMutate<Value, Args extends any[], Result>(
  atom: WritableAtom<Value, Args, Result>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = useSetAtom(atom);

  const mutateWithTx = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      try {
        const result: any = await mutate(...args);
        const { hash } = transaction;
        let signature = await signMessage({ message: hash });

        let v = Number.parseInt(signature.slice(-2), 16);
        if (v >= 27) v -= 27;
        signature = ('0x' + signature.slice(2, -2) + v.toString(16).padStart(2, '0')) as `0x${string}`;

        const tx = omit(camelcaseKeys(transaction, { deep: true }), 'hash');

        const rawTransaction: Transaction = {
          ...(tx as unknown as RawTransaction),
          witnesses: transaction.witnesses.map(() => {
            const signedWitness = bytes.hexify(
              blockchain.WitnessArgs.pack({
                lock: commons.omnilock.OmnilockWitnessLock.pack({
                  signature: bytes.bytify(signature!).buffer,
                }),
              }),
            );
            return signedWitness;
          }),
        };

        console.log(rawTransaction);
        // const rpc = new RPC('https://testnet.ckbapp.dev/rpc');
        // const txHash = await rpc.sendTransaction(rawTransaction);
        // console.log(txHash);

        setIsLoading(false);
        return result;
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    },
    [mutate],
  );

  return {
    mutate: mutateWithTx,
    isLoading,
  };
}
