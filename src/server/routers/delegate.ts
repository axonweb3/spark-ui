import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';

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
      const data = await api.getStakeHistory(
        address,
        pageNumber,
        pageSize,
        api.StakeEvent.Withdraw,
        api.OperateType.Delegate,
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
        api.OperateType.Delegate,
      );
      return data;
    }),
});
