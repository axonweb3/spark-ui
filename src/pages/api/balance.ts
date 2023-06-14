import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { addressMiddleware } from '@/middlewares/address';
import Boom from '@hapi/boom';
import axios from '@/lib/axios';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;
    const stakeStateRequest = axios.post(process.env.SPARK_RPC_URL!, {
      method: 'getStakeState',
      params: [address],
    });
    const rewardStateRequest = axios.post(process.env.SPARK_RPC_URL!, {
      method: 'getRewardState',
      params: [address],
    });
    const [stakeState, rewardState] = await Promise.all([stakeStateRequest, rewardStateRequest]);
    const { amount, stake_amount, delegate_amount, withdrawable_amount } = stakeState.data.result;
    const { unlock_amount, locked_amount } = rewardState.data.result;
    res.json({
      amount,
      stake_amount,
      delegate_amount,
      withdrawable_amount,
      unlock_amount,
      locked_amount,
    });
  });

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