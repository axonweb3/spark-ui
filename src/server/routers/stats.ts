import { publicProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';

export const statsRouter = router({
  chain: publicProcedure.query(async () => {
    const data = await api.getChainState();
    return data;
  }),
  amountByEpoch: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { pageNumber, pageSize } = input;
      const data = await api.getStakeAmountByEpoch(pageNumber, pageSize);
      return data;
    }),
  topStakeAddresses: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { pageNumber, pageSize } = input;
      const data = await api.getTopStakeAddresses(pageNumber, pageSize);
      return data;
    }),
  latestStakeTransactions: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { pageNumber, pageSize } = input;
      const data = await api.getLatestStakeTransactions(pageNumber, pageSize);
      return data;
    }),
});
