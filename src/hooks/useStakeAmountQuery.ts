import { BI } from '@ckb-lumos/lumos';
import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export function useStakeAmountQuery(address: string | undefined) {
  const { isLoading, data, error } = useQuery(
    ['stakeState', address],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/amount', { params: { address } });
      return response.data;
    },
  );

  const amount = useMemo(() => {
    if (!data || !data.amount) {
      return BI.from(0);
    }
    return BI.from(data.amount);
  }, [data]);

  const stakeAmount = useMemo(() => {
    if (!data || !data.stake_amount) {
      return BI.from(0);
    }
    return BI.from(data.stake_amount);
  }, [data]);

  const delegateAmount = useMemo(() => {
    if (!data || !data.delegate_amount) {
      return BI.from(0);
    }
    return BI.from(data.delegate_amount);
  }, [data]);

  const withdrawableAmount = useMemo(() => {
    if (!data || !data.withdrawable_amount) {
      return BI.from(0);
    }
    return BI.from(data.withdrawable_amount);
  }, [data]);

  const availableAmount = useMemo(() => {
    return amount.sub(stakeAmount).sub(delegateAmount);
  }, [amount, stakeAmount, delegateAmount]);

  return {
    isLoading,
    error,
    amount,
    stakeAmount,
    delegateAmount,
    withdrawableAmount,
    availableAmount,
  };
}
