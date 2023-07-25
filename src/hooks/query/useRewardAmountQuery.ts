import { trpc } from '@/server';
import { BI } from '@ckb-lumos/bi';
import { useMemo } from 'react';

export function useRewardAmountQuery() {
  const { data, refetch, isLoading } = trpc.amount.reward.useQuery();

  const unlockAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.unlock_amount ?? 0);
  }, [data]);

  const lockedAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.locked_amount ?? 0);
  }, [data]);

  return {
    unlockAmount,
    lockedAmount,
    refetch,
    isLoading,
  };
}
