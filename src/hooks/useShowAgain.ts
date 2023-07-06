import { SPARK_ALERT_KEY } from '@/consts';
import { atom, useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';

const showAgainAtom = atomFamily((name: string) =>
  atom(
    (typeof window !== 'undefined' &&
      localStorage.getItem(`${SPARK_ALERT_KEY}/${name}`)) ||
      true,
  ),
);

const showAgainAtomWithPersistence = atomFamily((name: string) =>
  atom(
    (get) => get(showAgainAtom(name)),
    (_, set, val: boolean) => {
      set(showAgainAtom(name), val);
      // @ts-ignore
      localStorage.setItem(`${SPARK_ALERT_KEY}/${name}`, val);
    },
  ),
);

export function useShowAgain(name: string) {
  const [showAgain, setShowAgain] = useAtom(showAgainAtomWithPersistence(name));
  return [showAgain === 'true' || showAgain === true, setShowAgain] as const;
}
