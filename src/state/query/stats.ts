import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';

export const statsChainAtom = trpc.stats.chain.atomWithQuery();

const statsAmountByEpochQueryAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    trpc.stats.amountByEpoch.atomWithQuery(() => params),
);

export const statsAmountByEpochAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      const data = await get(statsAmountByEpochQueryAtom(params));
      return data;
    }),
);

const statsTopStakeAddressesQueryAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    trpc.stats.topStakeAddresses.atomWithQuery(() => params),
);

export const statsTopStakeAddressesAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      const data = await get(statsTopStakeAddressesQueryAtom(params));
      return data;
    }),
);

const statsLatestStakeTransactionsQueryAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    trpc.stats.latestStakeTransactions.atomWithQuery(() => params),
);

export const statsLatestStakeTransactionsAtom = atomFamily(
  (params: { pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      const data = await get(statsLatestStakeTransactionsQueryAtom(params));
      return data;
    }),
);
