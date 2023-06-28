import { NextHandler, createRouter } from 'next-connect';
import logger from './logger';
import { NextApiRequest, NextApiResponse } from 'next';

export function getRouter() {
  const router = createRouter<NextApiRequest, NextApiResponse>();
  router.use(
    async (req: NextApiRequest, _: NextApiResponse, next: NextHandler) => {
      logger.debug(`[${req.method}] ${req.url} ${JSON.stringify(req.body)}`);
      await next();
    },
  );
  return router;
}
