import { SPART_SHOW_AGAIN_KEY } from '@/consts';
import { atom, useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';

const showAgainAtom = atomFamily((name: string) =>
  atom(
    (typeof window !== 'undefined' &&
      localStorage.getItem(`${SPART_SHOW_AGAIN_KEY}/${name}`)) ||
      true,
  ),
);

const showAgainAtomWithPersistence = atomFamily((name: string) =>
  atom(
    (get) => get(showAgainAtom(name)),
    (_, set, val: boolean) => {
      set(showAgainAtom(name), val);
      // @ts-ignore
      localStorage.setItem(`${SPART_SHOW_AGAIN_KEY}/${name}`, val);
    },
  ),
);

export function useShowAgain(name: string) {
  const [showAgain, setShowAgain] = useAtom(showAgainAtomWithPersistence(name));
  console.log(typeof showAgain);
  return [showAgain === 'true' || showAgain === true, setShowAgain] as const;
}
