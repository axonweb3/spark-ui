import { publicProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';

export const rateRouter = router({
  get: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { address } = input;
      const data = await api.getStakeRate(address);
      return data;
    }),
});
