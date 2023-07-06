import { router } from '../trpc';
import { amountRouter } from './amount';
import { delegateRouter } from './delegate';
import { rateRouter } from './rate';
import { rewardRouter } from './reward';
import { stakeRouter } from './stake';
import { statsRouter } from './stats';

export const appRouter = router({
  rate: rateRouter,
  amount: amountRouter,
  stake: stakeRouter,
  delegate: delegateRouter,
  reward: rewardRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
