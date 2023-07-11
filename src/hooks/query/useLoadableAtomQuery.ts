import { Atom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useMemo, useState } from 'react';

export function useLoadableAtomQuery<T>(atom: Atom<Promise<T>>) {
  const [value, setValue] = useState<T>();
  const response = useAtomValue(loadable(atom));
  const isLoading = useMemo(() => response.state === 'loading', [response]);

  useEffect(() => {
    if (response.state === 'hasData') {
      setValue(response.data);
    }
  }, [response]);

  return {
    value,
    isLoading,
  };
}
