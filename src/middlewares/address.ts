import { parseAddress } from '@ckb-lumos/helpers';
import { config } from '@ckb-lumos/lumos';
import * as Boom from '@hapi/boom';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export async function addressMiddleware(
  req: NextApiRequest,
  _: NextApiResponse,
  next: NextHandler,
) {
  const { address } = req.query;

  config.initializeConfig(
    process.env.NODE_ENV === 'production'
      ? config.predefined.LINA
      : config.predefined.AGGRON4,
  );

  if (typeof address !== 'string' || !parseAddress(address)) {
    throw Boom.badRequest('Invalid address');
  }
  await next();
}
