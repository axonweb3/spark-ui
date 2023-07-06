import { initTRPC } from '@trpc/server';
import { Context } from './context';
import * as Boom from '@hapi/boom';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;

const hasAddress = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.address) {
    throw Boom.unauthorized('Missing address');
  }
  return opts.next({
    ctx: {
      address: ctx.address,
    },
  });
});

export const addressProcedure = publicProcedure.use(hasAddress);
