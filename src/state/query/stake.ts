import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';

const stakeWithdrawalQueryAtom = atomFamily(
  (params: { address: string; pageNumber: number; pageSize: number }) =>
    trpc.stake.withdrawal.atomWithQuery(() => params),
);

export const stakeWithdrawalAtom = atomFamily(
  (params: { address?: string; pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      if (!params.address) {
        return {
          total: 0,
          data: [],
        };
      }
      params.address = undefined;
      const data = await get(
        stakeWithdrawalQueryAtom(params as Required<typeof params>),
      );
      return data;
    }),
);

const stakeHistoryQueryAtom = atomFamily(
  (params: { address: string; pageNumber: number; pageSize: number }) =>
    trpc.stake.history.atomWithQuery(() => params),
);

export const stakeHistoryAtom = atomFamily(
  (params: { address?: string; pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      if (!params.address) {
        return {
          total: 0,
          data: [],
        };
      }
      params.address = undefined;
      const data = await get(
        stakeHistoryQueryAtom(params as Required<typeof params>),
      );
      return data;
    }),
);
