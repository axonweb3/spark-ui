import { useRouter } from 'next/router';
import React from 'react';

export function useRouteQuery(key: string, defaultValue: string = '') {
  const router = useRouter();
  const query = router.query[key] ?? defaultValue;

  const setQuery = React.useCallback(
    (value: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, [key]: value },
      });
    },
    [router, key],
  );

  return [query, setQuery];
}
