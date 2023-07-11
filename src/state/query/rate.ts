import { atom } from 'jotai';
import { trpc } from '../trpc';
import { atomFamily } from 'jotai/utils';

const rateQueryAtom = atomFamily((address: string) => trpc.rate.get.atomWithQuery(() => ({ address })));

export const rateAtom = atomFamily((address: string | undefined) =>
  atom(async (get) => {
    if (!address) {
      return null;
    }
    const rate = await get(rateQueryAtom(address));
    return rate;
  }),
);
