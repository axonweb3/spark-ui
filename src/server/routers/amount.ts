import { addressProcedure, router } from '@/server/trpc';
import * as api from '@/server/api';

export const amountRouter = router({
  stake: addressProcedure.query(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.getStakeState(address);
    return data;
  }),
  reward: addressProcedure.query(async ({ ctx }) => {
    const { address } = ctx;
    const data = await api.getRewardState(address);
    return data;
  }),
});
