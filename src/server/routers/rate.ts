import { publicProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';
import { z } from 'zod';
import { StakeRate } from '../api/type';

export const rateRouter = router({
  get: publicProcedure
    .input(
      z.object({
        address: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { address } = input;
      if (!address) {
        return { stake_rate: 0, delegate_rate: 0, minimum_amount: 0 } as StakeRate;
      }
      const data = await api.getStakeRate(address);
      return data;
    }),
});
