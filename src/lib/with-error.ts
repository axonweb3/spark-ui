import { NextApiRequest, NextApiResponse } from 'next';
import { NodeRouter } from 'next-connect/dist/types/node';
import Boom from '@hapi/boom';

export function withErrorHandle(
  router: NodeRouter<NextApiRequest, NextApiResponse>,
) {
  return router.handler({
    onError: (err, _, res) => {
      if ((err as Boom.Boom).isBoom) {
        const { statusCode, payload } = (err as Boom.Boom).output;
        res.status(statusCode).json(payload);
      }
    },
  });
}
