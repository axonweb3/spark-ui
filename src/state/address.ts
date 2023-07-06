import { SPARK_ADDRESS_KEY } from '@/consts';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';

const cookieStorage = createJSONStorage<string | undefined>(() => {
  return {
    getItem: (key: string) => Cookies.get(key) ?? null,
    setItem: (key: string, value: string) => Cookies.set(key, value),
    removeItem: (key: string) => Cookies.remove(key),
  };
});

export const addressAtom = atomWithStorage<string | undefined>(
  SPARK_ADDRESS_KEY,
  undefined,
  cookieStorage,
);
