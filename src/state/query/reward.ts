import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';

const rewardWithdrawalQueryAtom = atomFamily((params: { address: string; pageNumber: number; pageSize: number }) =>
  trpc.reward.withdrawal.atomWithQuery(() => params),
);

export const rewardWithdrawalAtom = atomFamily((params: { address?: string; pageNumber: number; pageSize: number }) =>
  atom(async (get) => {
    if (!params.address) {
      return {
        total: 0,
        data: [],
      };
    }
    params.address = undefined;
    const data = await get(rewardWithdrawalQueryAtom(params as Required<typeof params>));
    return data;
  }),
);

const rewardHistoryQueryAtom = atomFamily((params: { address: string; pageNumber: number; pageSize: number }) =>
  trpc.reward.history.atomWithQuery(() => params),
);

export const rewardHistoryAtom = atomFamily((params: { address?: string; pageNumber: number; pageSize: number }) =>
  atom(async (get) => {
    if (!params.address) {
      return {
        total: 0,
        data: [],
      };
    }
    params.address = undefined;
    const data = await get(rewardHistoryQueryAtom(params as Required<typeof params>));
    return data;
  }),
);
