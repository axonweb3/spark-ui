import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { HistoryEvent } from '../api/type';

export const rewardRouter = router({
  withdrawal: addressProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address } = ctx;
      const { page, limit } = input;
      const data = await api.getRewardHistory(address, HistoryEvent.Withdraw, { page, limit });
      return data;
    }),
  history: addressProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address } = ctx;
      const { page, limit } = input;
      const data = await api.getRewardHistory(address, null, { page, limit });
      return data;
    }),
  withdraw: addressProcedure.mutation(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.withdrawReward(address);
    return data;
  }),
});
