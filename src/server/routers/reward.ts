import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';

export const rewardRouter = router({
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
      const data = await api.getWithdrawalHistory(
        address,
        pageNumber,
        pageSize,
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
      const data = await api.getRewardHistory(address, pageNumber, pageSize);
      return data;
    }),
  withdraw: addressProcedure
    .mutation(async ({ ctx }) => {
      const { address } = ctx;
      const data = await api.withdrawReward(address);
      return data;
    }),
});
