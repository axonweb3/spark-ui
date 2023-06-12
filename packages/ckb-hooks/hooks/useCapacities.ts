import { BI } from '@ckb-lumos/lumos';
import { useAtom } from 'jotai';
import { atomsWithMutation } from 'jotai-tanstack-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useConfig } from '../context';
import { WithMutationArgs, defaultArgs } from './args';
import * as actions from '../actions';
import throttle from 'lodash.throttle';

export const getBalanceByCapacity = (capacity: BI): string => {
  return (Math.floor(BI.from(capacity).toNumber() / 10 ** 6) / 100).toFixed(2);
};

export function useCapacities(args?: WithMutationArgs<void, BI>) {
  const { onSuccess, onError, onSettled } = args ?? defaultArgs;
  const config = useConfig();
  const capacitiesMutationAtom = useMemo(() => {
    const [, atom] = atomsWithMutation(() => ({
      mutationKey: ['capacities'],
      mutationFn: async () => {
        const capacities = await actions.getCapacities();
        return capacities;
      },
      onSuccess,
      onError,
      onSettled,
    }));
    return atom;
  }, [onSuccess, onError, onSettled]);
  const [{ data: capacities, error, isError, isLoading, isSuccess }, mutate] = useAtom(capacitiesMutationAtom);
  const balance = useMemo(() => (capacities ? getBalanceByCapacity(capacities) : '0'), [capacities]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh: () => void = useCallback(
    throttle(() => {
      mutate([undefined]);
    }, 200),
    [mutate],
  );

  useEffect(() => {
    config?.onConnectorChange(() => {
      refresh();
    });
    if (config?.connector) {
      return config?.onConnectDataChange(config.connector, () => {
        refresh();
      });
    }
  }, [config, refresh]);

  return {
    data: capacities,
    refresh,
    capacities,
    balance,
    error,
    isError,
    isLoading,
    isSuccess,
  };
}
