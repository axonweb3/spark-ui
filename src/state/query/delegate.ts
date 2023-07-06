import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';

const delegatedRecordsQueryAtom = atomFamily(
  (params: { address: string; pageNumber: number; pageSize: number }) =>
    trpc.delegate.delegated.atomWithQuery(() => params),
);

export const delegatedRecordsAtom = atomFamily(
  (params: { address?: string; pageNumber: number; pageSize: number }) =>
    atom(async (get) => {
      if (!params.address) {
        return {
          total: 0,
          data: [],
        };
      }
      params.address = undefined;
      const data = await get(delegatedRecordsQueryAtom(params as Required<typeof params>));
      return data;
    }),
);

const delegateWithdrawalQueryAtom = atomFamily(
  (params: { address: string; pageNumber: number; pageSize: number }) =>
    trpc.delegate.withdrawal.atomWithQuery(() => params),
);

export const delegateWithdrawalAtom = atomFamily(
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
        delegateWithdrawalQueryAtom(params as Required<typeof params>),
      );
      return data;
    }),
);

const delegateHistoryQueryAtom = atomFamily(
  (params: { address: string; pageNumber: number; pageSize: number }) =>
    trpc.delegate.history.atomWithQuery(() => params),
);

export const delegateHistoryAtom = atomFamily(
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
        delegateHistoryQueryAtom(params as Required<typeof params>),
      );
      return data;
    }),
);
