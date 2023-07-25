import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { HistoryEvent } from '../api/type';

export const stakeRouter = router({
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
      // FIXME
      const data = await api.getStakeHistory(address, HistoryEvent.Withdraw, { page, limit });
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
      const data = await api.getStakeHistory(address, null, { page, limit });
      return data;
    }),
  add: addressProcedure
    .input(
      z.object({
        amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { address } = ctx;
      const { amount } = input;
      const data = await api.stake(address, amount);
      return data;
    }),
  redeem: addressProcedure
    .input(
      z.object({
        amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { address } = ctx;
      const { amount } = input;
      const data = await api.unstake(address, amount);
      return data;
    }),
  withdraw: addressProcedure.mutation(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.withdrawStake(address, 'stake');
    return data;
  }),
});
