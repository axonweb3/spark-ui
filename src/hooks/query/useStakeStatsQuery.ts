import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueryError } from './type';

export interface IChainState {
  epoch: number;
  period: number;
  block_number: number;
  total_stake_amount: number;
}

export interface IStakeAmountByEpoch {
  epoch: number;
  amount: number;
  type: 'stake' | 'delegate';
}

export interface ITopStakeAddress {
  amount: number;
  address: string;
}

export interface ILatestStakeTransaction {
  timestamp: string;
  amount: number;
  hash: string;
  status: 'pending' | 'success' | 'failed';
}

interface IQueryData {
  stakeAmountByEpoch: IStakeAmountByEpoch[];
  chainState: IChainState;
  topStakeAddresses: ITopStakeAddress[];
  latestStakeTransactions: ILatestStakeTransaction[];
}

export function useStakeStatsQuery(
  options?: Parameters<typeof useQuery<unknown, IQueryError, IQueryData>>[2],
) {
  const { isLoading, isSuccess, isError, isFetching, data, error } = useQuery<
    unknown,
    IQueryError,
    IQueryData
  >(
    'stakeStats',
    async () => {
      const response = await axios.get('/api/stats');
      return response.data;
    },
    options,
  );
  const stakeAmountByEpoch = useMemo(
    () => (data ? data.stakeAmountByEpoch : []),
    [data],
  );

  const chainState = useMemo(
    () =>
      data
        ? data.chainState
        : {
            epoch: 0,
            period: 0,
            block_number: 0,
            total_stake_amount: 0,
          },
    [data],
  );

  const topStakeAddresses = useMemo(
    () => (data ? data.topStakeAddresses : []),
    [data],
  );

  const latestStakeTransactions = useMemo(
    () => (data ? data.latestStakeTransactions : []),
    [data],
  );

  return {
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
    data: {
      stakeAmountByEpoch,
      chainState,
      topStakeAddresses,
      latestStakeTransactions,
    },
  };
}
