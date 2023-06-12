import { atomWithStorage } from 'jotai/utils';
import { Chain } from '../chains';

export const chainAtom = atomWithStorage<Chain | undefined>('chain', undefined);
