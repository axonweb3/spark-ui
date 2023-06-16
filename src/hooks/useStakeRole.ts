import { SPARK_ROLE_KEY } from '@/consts';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useCookie } from 'react-use';

export enum StakeRoleType {
  Validator = 'validator',
  Delegator = 'delegator',
}

export function useStakeRole() {
  const router = useRouter();
  const [role, setRole] = useCookie(SPARK_ROLE_KEY);

  const isValidator = useMemo(() => role === StakeRoleType.Validator, [role]);
  const isDelegator = useMemo(() => role === StakeRoleType.Delegator, [role]);

  const beValidator = useCallback(() => {
    setRole(StakeRoleType.Validator);
    router.push('/stake/settings');
  }, [router, setRole]);

  const beDelegator = useCallback(() => {
    setRole(StakeRoleType.Delegator);
    router.push('/delegate');
  }, [router, setRole]);

  return {
    role,
    isValidator,
    isDelegator,
    beValidator,
    beDelegator,
  };
}
