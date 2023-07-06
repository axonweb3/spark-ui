import { Paginated, StakeRecord } from '@/server/api';
import { Atom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { AtomFamily } from 'jotai/vanilla/utils/atomFamily';
import { useEffect, useMemo, useState } from 'react';

export function usePaginatedAtomQuery(
  asyncAtom: AtomFamily<any, Atom<Promise<Paginated<any>>>>,
  address?: string,
) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<StakeRecord[]>([]);
  const queryParams = useMemo(
    () => ({ address, pageNumber, pageSize }),
    [address, pageNumber, pageSize],
  );

  const queryResponse = useAtomValue(loadable(asyncAtom(queryParams)));

  const isLoading = useMemo(
    () => queryResponse.state === 'loading',
    [queryResponse],
  );

  useEffect(() => {
    if (queryResponse.state === 'hasData') {
      const { total = 0, data = [] } = queryResponse.data;
      setTotal(total);
      setData(data);
    }
  }, [queryResponse]);

  return {
    isLoading,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    total,
    data,
  };
}
