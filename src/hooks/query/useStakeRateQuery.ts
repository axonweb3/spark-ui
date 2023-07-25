import { trpc } from '@/server';
import { useConnect } from '../useConnect';
import { useMemo } from 'react';

export default function useStakeRateQuery() {
  const { address } = useConnect();
  const { data, isLoading, refetch } = trpc.rate.get.useQuery({ address });

  const stakeRate = useMemo(() => data?.stake_rate ?? 0, [data]);
  const delegateRate = useMemo(() => data?.delegate_rate ?? 0, [data]);
  const minimumAmount = useMemo(() => data?.minimum_amount ?? 0, [data]);

  return {
    stakeRate,
    delegateRate,
    minimumAmount,
    isLoading,
    refetch,
  };
}
