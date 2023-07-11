import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { OperateType, StakeEvent } from '../api/type';

export const delegateRouter = router({
  delegated: addressProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address } = ctx;
      const { pageNumber, pageSize } = input;
      const data = await api.getDelegatedRecords(address, pageNumber, pageSize);
      return data;
    }),
  withdrawal: addressProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address } = ctx;
      const { pageNumber, pageSize } = input;
      const data = await api.getStakeHistory(address, pageNumber, pageSize, StakeEvent.Withdraw, OperateType.Delegate);
      return data;
    }),
  history: addressProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address } = ctx;
      const { pageNumber, pageSize } = input;
      const data = await api.getStakeHistory(address, pageNumber, pageSize, undefined, OperateType.Delegate);
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
