import { SPARK_ALERT_KEY } from '@/consts';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

const alterAtom = atomFamily((name: string) =>
  atom((typeof window !== 'undefined' && localStorage.getItem(`${SPARK_ALERT_KEY}/${name}`)) || true),
);

export const alertAtomWithPersistence = atomFamily((name: string) =>
  atom(
    (get) => get(alterAtom(name)),
    (_, set, val: boolean) => {
      set(alterAtom(name), val);
      localStorage.setItem(`${SPARK_ALERT_KEY}/${name}`, val.toString());
    },
  ),
);
