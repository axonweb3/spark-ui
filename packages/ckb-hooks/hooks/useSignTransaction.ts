import { atomsWithMutation } from 'jotai-tanstack-query';
import * as actions from '../actions';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { WithMutationArgs, defaultArgs } from './args';
import { Transaction } from '@ckb-lumos/base';
import { helpers } from '@ckb-lumos/lumos';

export interface UseSignTransactionArgs {
  tx: helpers.TransactionSkeletonType;
}

export function useSignTransaction(args?: WithMutationArgs<UseSignTransactionArgs, string>) {
  const { tx, onSuccess, onError, onSettled } = args ?? defaultArgs;
  const signTransactionMutationAtom = useMemo(() => {
    const [, atom] = atomsWithMutation(() => ({
      mutationKey: ['signTransaction'],
      mutationFn: async ({ tx }: UseSignTransactionArgs) => {
        const txHash = await actions.signTransaction(tx);
        return txHash;
      },
      onSuccess,
      onError,
      onSettled,
    }));
    return atom;
  }, [onSuccess, onError, onSettled]);

  const [{ data, error, isError, isLoading, isSuccess }, mutate] = useAtom(signTransactionMutationAtom);

  const signTransaction = useCallback(async () => {
    await mutate([{ tx }]);
  }, [mutate, tx]);

  return {
    error,
    isError,
    isLoading,
    isSuccess,
    data: data as Transaction,
    signTransaction,
  };
}
