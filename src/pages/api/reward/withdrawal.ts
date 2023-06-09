import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { addressMiddleware } from '@/middlewares/address';
import Boom from '@hapi/boom';
import axios from '@/lib/axios';
import env from '@/lib/env';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const { data } = await axios.post(env.SPARK_RPC_URL!, {
      method: 'getWithdrawalHistory',
      params: [address, pageNumber, pageSize],
    });
    res.json(data.result);
  })

export default router.handler({
  onError: (err, _, res) => {
    if ((err as Boom.Boom).isBoom) {
      const { statusCode, payload } = (err as Boom.Boom).output;
      res.status(statusCode).json(payload);
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  },
});

