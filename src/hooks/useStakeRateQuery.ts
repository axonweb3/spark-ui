import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueryError } from './type';

interface IQueryData {
  rate: number;
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

  return {
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
    stakeRate,
  };
}
