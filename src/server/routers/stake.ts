import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';

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
        api.StakeEvent.Withdraw,
        api.OperateType.Stake,
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
        api.OperateType.Stake,
      );
      return data;
    }),
});
