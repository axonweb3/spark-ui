import { parseAddress } from '@ckb-lumos/helpers';
import { config } from '@ckb-lumos/lumos';
import * as Boom from '@hapi/boom';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

function isValidAddress(address: string) {
  try {
    config.initializeConfig(
      process.env.NODE_ENV === 'production'
        ? config.predefined.LINA
        : config.predefined.AGGRON4,
    );

    return parseAddress(address);
  } catch (err) {
    return false;
  }
}

export async function addressMiddleware(
  req: NextApiRequest,
  _: NextApiResponse,
  next: NextHandler,
) {
  const { address } = req.method === 'GET' ? req.query : req.body;

  if (typeof address !== 'string' || !isValidAddress(address)) {
    throw Boom.badRequest('Invalid address');
  }
  await next();
}
