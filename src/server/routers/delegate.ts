import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { TransactionEvent } from '../api/type';

export const delegateRouter = router({
  records: addressProcedure.query(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.getDelegateRecords(address);
    return data.inner;
  }),
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
      const data = await api.getDelegateHistory(address, TransactionEvent.Withdraw, { page, limit });
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
      const data = await api.getDelegateHistory(address, null, { page, limit });
      return data;
    }),
  add: addressProcedure
    .input(
      z.object({
        delegateTo: z.string(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { address } = ctx;
      const { delegateTo, amount } = input;
      const data = await api.delegate(address, delegateTo, amount);
      return data;
    }),
  // TODO: redeem method
  withdraw: addressProcedure.mutation(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.withdrawStake(address, 'delegate');
    return data;
  }),
});
