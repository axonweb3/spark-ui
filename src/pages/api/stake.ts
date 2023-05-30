import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { addressMiddleware } from '@/middlewares/address';
import Boom from '@hapi/boom';
import axios from 'axios';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, event, operation } = req.query;
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const { data } = await axios.post(process.env.SPARK_RPC_URL!, {
      method: 'getStakeHistory',
      params: [address, pageNumber, pageSize, event, operation],
    });
    if (data.error) {
      throw Boom.badRequest(data.error.message);
    }
    res.json(data.result);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, amount } = req.query;
    const { data } = await axios.post(process.env.SPARK_RPC_URL!, {
      method: 'addStake',
      params: [address, amount],
    });
    // FIXME: parse response tx
    res.json(data.result);
  });

export default router.handler({
  onError: (err, _, res) => {
    if ((err as Boom.Boom).isBoom) {
      const { statusCode, payload } = (err as Boom.Boom).output;
      res.status(statusCode).json(payload);
    }
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  },
});
