import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export function useStakeRate(address: string | undefined) {
  const { isLoading, isSuccess, data, error } = useQuery(
    ['stakeRate', address],
    async () => {
      if (!address) {
        return undefined;
      }
      const response = await axios.get('/api/stake/rate', { params: { address } });
      return response.data;
    },
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
    error,
    stakeRate,
  };
}
