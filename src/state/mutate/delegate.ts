import { trpc } from '../trpc';

export const delegateMutateAtom = trpc.delegate.add.atomWithMutation();
export const delegateWithdrawAtom = trpc.delegate.withdraw.atomWithMutation();
