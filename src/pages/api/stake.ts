import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { addressMiddleware } from '@/middlewares/address';
import Boom from '@hapi/boom';
import axios from 'axios';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;
    const { data } = await axios.post(process.env.SPARK_RPC_URL!, {
      method: 'getStakeState',
      params: [address],
    });
    const { amount, stake_amount } = data.result;

    res.json({
      amount,
      stake_amount,
    });
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
