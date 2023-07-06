import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { SPARK_ADDRESS_KEY } from '@/consts';

interface CreateContextOptions {
  address: string;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
  return { ...opts };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  const address = opts.req.cookies[SPARK_ADDRESS_KEY] ?? '';
  return await createContextInner({ address });
}
