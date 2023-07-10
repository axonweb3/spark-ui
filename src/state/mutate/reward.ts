import { trpc } from '../trpc';

export const rewardWithdrawAtom = trpc.stake.withdraw.atomWithMutation();
