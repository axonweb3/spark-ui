import { Atom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { BI } from '@ckb-lumos/bi';
import { useEffect, useMemo, useState } from 'react';
import { AtomFamily } from 'jotai/vanilla/utils/atomFamily';

export function useAmountAtomQuery(address: string | undefined, asyncAtom: AtomFamily<string | undefined, Atom<Promise<BI>>>) {
  const queryResponse = useAtomValue(loadable(asyncAtom(address)));
  const [amount, setAmount] = useState(BI.from(0));
  const isLoading = useMemo(() => queryResponse.state === 'loading', [queryResponse]);

  useEffect(() => {
    if (queryResponse.state === 'hasData') {
      setAmount(queryResponse.data);
    }
  }, [queryResponse]);

  return {
    amount,
    isLoading,
  };
}
