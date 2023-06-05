import { BI } from '@ckb-lumos/lumos';
import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueryError } from './type';

interface IQueryData {
  amount: string;
  stake_amount: string;
  delegate_amount: string;
  withdrawable_amount: string;
}

export function useStakeAmountQuery(
  address: string | undefined,
  options?: Parameters<typeof useQuery<unknown, IQueryError, IQueryData>>[2],
) {
  const { isLoading, isSuccess, isError, data, error } = useQuery<
    unknown,
    IQueryError,
    IQueryData
  >(
    ['stakeState', address],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/amount', { params: { address } });
      return response.data;
    },
    options,
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
    isSuccess,
    isError,
    error,
    amount,
    stakeAmount,
    delegateAmount,
    withdrawableAmount,
    availableAmount,
  };
}
