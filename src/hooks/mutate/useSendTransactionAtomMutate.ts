import { CellDep, commons, config, helpers } from '@ckb-lumos/lumos';
import { blockchain } from '@ckb-lumos/base';
import { bytes } from '@ckb-lumos/codec';
import { WritableAtom, useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { signMessage } from '@wagmi/core';

type ScriptName = keyof (typeof config.predefined.AGGRON4)['SCRIPTS'];

const OMNILOCK_SIGNATURE_PLACEHOLDER = bytes.hexify(
  new Uint8Array(
    commons.omnilock.OmnilockWitnessLock.pack({
      signature: new Uint8Array(65).buffer,
    }).byteLength,
  ),
);

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

        // TODO: create transaction and send it to the spark

        // let tx = helpers
        //   .TransactionSkeleton({})
        //   .update('inputs', (inputs) => inputs.push(...result.inputs))
        //   .update('outputs', (outputs) => outputs.push(...result.outputs));

        // const inputs = tx.get('inputs');
        // tx = tx.update('cellDeps', (cellDeps) =>
        //   cellDeps.push(
        //     getScriptCellDep('OMNILOCK'),
        //     getScriptCellDep('SECP256K1_BLAKE160'),
        //   ),
        // );

        // const witness = bytes.hexify(
        //   blockchain.WitnessArgs.pack({ lock: OMNILOCK_SIGNATURE_PLACEHOLDER }),
        // );
        // inputs.forEach(() => {
        //   tx = tx.update('witnesses', (witnesses) => witnesses.push(witness));
        // });

        // tx = commons.omnilock.prepareSigningEntries(tx);
        // const { message } = tx.signingEntries.get(0)!;
        // let signature = await signMessage({ message });

        // // Fix ECDSA recoveryId v parameter
        // // https://bitcoin.stackexchange.com/questions/38351/ecdsa-v-r-s-what-is-v
        // let v = Number.parseInt(signature.slice(-2), 16);
        // if (v >= 27) v -= 27;
        // signature = ('0x' +
        //   signature.slice(2, -2) +
        //   v.toString(16).padStart(2, '0')) as typeof signature;

        // const signedWitness = bytes.hexify(
        //   blockchain.WitnessArgs.pack({
        //     lock: commons.omnilock.OmnilockWitnessLock.pack({
        //       signature: bytes.bytify(signature!).buffer,
        //     }),
        //   }),
        // );

        // tx = tx.update('witnesses', (witnesses) =>
        //   witnesses.set(0, signedWitness),
        // );
        // const signedTx = helpers.createTransactionFromSkeleton(tx);

        // return signedTx;

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
