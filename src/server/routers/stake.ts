import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { OperateType, StakeEvent } from '../api/type';

export const stakeRouter = router({
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
      const data = await api.getStakeHistory(
        address,
        pageNumber,
        pageSize,
        StakeEvent.Withdraw,
        OperateType.Stake,
      );
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
      const data = await api.getStakeHistory(
        address,
        pageNumber,
        pageSize,
        undefined,
        OperateType.Stake,
      );
      return data;
    }),
  add: addressProcedure
    .input(z.object({
      amount: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { address } = ctx;
      const { amount } = input;
      const data = await api.stake(address, amount);
      return data;
    }),
  redeem: addressProcedure
    .input(z.object({
      amount: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { address } = ctx;
      const { amount } = input;
      const data = await api.unstake(address, amount);
      return data;
    }),
  withdraw: addressProcedure
    .mutation(async ({ ctx }) => {
      const { address } = ctx;
      const data = await api.withdrawStake(address, 'stake');
      return data;
    }),
});
