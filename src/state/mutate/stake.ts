import { trpc } from '../trpc';

export const stakeMutateAtom = trpc.stake.add.atomWithMutation();
export const unstakeMutateAtom = trpc.stake.redeem.atomWithMutation();
export const stakeWithdrawAtom = trpc.stake.withdraw.atomWithMutation();
