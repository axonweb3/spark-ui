import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueryError } from './type';

interface IQueryData {
  rate: number;
  minimumAmount: string;
}

export function useStakeRateQuery(
  address: string | undefined,
  options?: Parameters<typeof useQuery<unknown, IQueryError, IQueryData>>[2],
) {
  const { isLoading, isSuccess, isError, isFetching, data, error } = useQuery<
    unknown,
    IQueryError,
    IQueryData
  >(
    ['stakeRate', address],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/stake/rate', {
        params: { address },
      });
      return response.data;
    },
    options,
  );

  const stakeRate = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data.rate;
  }, [data]);

  const minimumAmount = useMemo(() => {
    if (!data) {
      return '0';
    }
    return data.minimumAmount.toString();
  }, [data]);

  return {
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
    stakeRate,
    minimumAmount,
  };
}
