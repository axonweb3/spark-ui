import { trpc } from '@/server';
import { BI } from '@ckb-lumos/bi';
import { useMemo } from 'react';

export function useStakeAmountQuery() {
  const { data, refetch, isLoading } = trpc.amount.stake.useQuery();

  const totalAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.total_amount ?? 0);
  }, [data]);

  const stakeAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.stake_amount ?? 0);
  }, [data]);

  const delegateAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.delegate_amount ?? 0);
  }, [data]);

  const withdrawableAmount = useMemo(() => {
    if (!data) {
      return BI.from(0);
    }
    return BI.from(data.withdrawable_amount ?? 0);
  }, [data]);

  const availableAmount = useMemo(() => {
    return totalAmount.sub(stakeAmount).sub(delegateAmount);
  }, [totalAmount, stakeAmount, delegateAmount]);

  return {
    totalAmount,
    stakeAmount,
    delegateAmount,
    withdrawableAmount,
    availableAmount,
    refetch,
    isLoading,
  };
}
