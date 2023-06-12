import { MutationOptions } from '@tanstack/query-core';

const noop = () => undefined;

export type WithMutationArgs<T, R> = T &
  Partial<Pick<MutationOptions<R, undefined, T, undefined>, 'onSuccess' | 'onError' | 'onSettled'>>;

export const defaultArgs: WithMutationArgs<any, void> = {
  onSuccess: noop,
  onError: noop,
  onSettled: noop,
};
