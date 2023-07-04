import { BI } from '@ckb-lumos/bi';
import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueryError } from './type';

interface IQueryData {
  amount: string;
  stake_amount: string;
  delegate_amount: string;
  withdrawable_amount: string;
  unlock_amount: string;
  locked_amount: string;
}

function getAmountByKey(data: IQueryData | undefined, key: keyof IQueryData) {
  if (!data || !data[key]) {
    return BI.from(0);
  }
  return BI.from(data[key]);
}

export function useBalanceQuery(
  address: string | undefined,
  options?: Parameters<typeof useQuery<unknown, IQueryError, IQueryData>>[2],
) {
  const { isLoading, isSuccess, isError, data, error } = useQuery<
    unknown,
    IQueryError,
    IQueryData
  >(
    ['amount', address],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/balance', { params: { address } });
      return response.data;
    },
    options,
  );

  const totalAmount = useMemo(() => getAmountByKey(data, 'amount'), [data]);
  const stakedAmount = useMemo(() => getAmountByKey(data, 'stake_amount'), [data]);
  const delegatedAmount = useMemo(() => getAmountByKey(data, 'delegate_amount'), [data]);
  const withdrawableAmount = useMemo(() => getAmountByKey(data, 'withdrawable_amount'), [data]);
  const availableAmount = useMemo(() => totalAmount.sub(stakedAmount).sub(delegatedAmount), [stakedAmount, delegatedAmount, totalAmount]);
  const unlockAmount = useMemo(() => getAmountByKey(data, 'unlock_amount'), [data]);
  const lockedAmount = useMemo(() => getAmountByKey(data, 'locked_amount'), [data]);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    totalAmount,
    stakedAmount,
    delegatedAmount,
    withdrawableAmount,
    availableAmount,
    unlockAmount,
    lockedAmount,
  };
}
