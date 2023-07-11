import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';
import { BI } from '@ckb-lumos/bi';

const stakeAmountQueryAtom = atomFamily(() => trpc.amount.stake.atomWithQuery());

export const stakeAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    if (!address) {
      return null;
    }
    const amount = await get(stakeAmountQueryAtom(address));
    return {
      amount: BI.from(amount.amount ?? 0),
      stake_amount: BI.from(amount.stake_amount ?? 0),
      delegate_amount: BI.from(amount.delegate_amount ?? 0),
      withdrawable_amount: BI.from(amount.withdrawable_amount ?? 0),
    };
  }),
);

export const availableAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const stakeAmount = await get(stakeAmountAtom(address));
    if (!stakeAmount) {
      return BI.from(0);
    }
    const { amount, stake_amount, delegate_amount } = stakeAmount;
    return amount.sub(stake_amount).sub(delegate_amount);
  }),
);

export const stakedAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const stakeAmount = await get(stakeAmountAtom(address));
    if (!stakeAmount) {
      return BI.from(0);
    }
    const { stake_amount } = stakeAmount;
    return stake_amount;
  }),
);

export const delegatedAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const stakeAmount = await get(stakeAmountAtom(address));
    if (!stakeAmount) {
      return BI.from(0);
    }
    const { delegate_amount } = stakeAmount;
    return delegate_amount;
  }),
);

export const withdrawableAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const stakeAmount = await get(stakeAmountAtom(address));
    if (!stakeAmount) {
      return BI.from(0);
    }
    const { withdrawable_amount } = stakeAmount;
    return withdrawable_amount;
  }),
);

const rewardAmountQueryAtom = atomFamily(() => trpc.amount.reward.atomWithQuery());

export const rewardAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    if (!address) {
      return null;
    }
    const amount = await get(rewardAmountQueryAtom(address));
    return {
      unlock_amount: BI.from(amount.unlock_amount ?? 0),
      locked_amount: BI.from(amount.locked_amount ?? 0),
    };
  }),
);

export const unlockAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const rewardAmount = await get(rewardAmountAtom(address));
    if (!rewardAmount) {
      return BI.from(0);
    }
    const { unlock_amount } = rewardAmount;
    return unlock_amount;
  }),
);

export const lockedAmountAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    const rewardAmount = await get(rewardAmountAtom(address));
    if (!rewardAmount) {
      return BI.from(0);
    }
    const { locked_amount } = rewardAmount;
    return locked_amount;
  }),
);
