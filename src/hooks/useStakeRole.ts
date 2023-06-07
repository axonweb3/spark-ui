import { STAKE_ROLE_KEY } from "@/consts";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useCookie } from "react-use";

export enum StakeRoleType {
  Validator = 'validator',
  Delegator = 'delegator',
};

export function useStakeRole() {
  const router = useRouter();
  const [value, updateCookie] = useCookie(STAKE_ROLE_KEY);

  const beValidator = useCallback(() => {
    updateCookie(StakeRoleType.Validator);
    router.push('/stake/settings');
  }, [router, updateCookie]);

  const beDelegator = useCallback(() => {
    updateCookie(StakeRoleType.Delegator);
    router.push('/delegate');
  }, [router, updateCookie]);

  return {
    role: value,
    beValidator,
    beDelegator,
  };
}
