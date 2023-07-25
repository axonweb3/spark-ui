import { publicProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { OperationType } from '../api/type';

export const statsRouter = router({
  chain: publicProcedure.query(async () => {
    const data = await api.getChainState();
    return data;
  }),
  amountByEpoch: publicProcedure
    .input(
      z.object({
        start: z.number(),
        end: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { start, end } = input;
      const data = await api.getStakeAmountByEpoch(start, end, OperationType.Stake);
      return data;
    }),
  topStakeAddress: publicProcedure
    .input(
      z.object({
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { limit } = input;
      const data = await api.getTopStakeAddress(limit);
      return data;
    }),
  latestStakeTransactions: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const data = await api.getLatestStakeTransactions({ page, limit });
      return data;
    }),
});
