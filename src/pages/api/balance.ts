import type { NextApiRequest, NextApiResponse } from 'next';
import { addressMiddleware } from '@/middlewares/address';
import * as RpcClient from '@/lib/rpc-client';
import { withErrorHandle } from '@/lib/with-error';
import { getRouter } from '@/lib/router';

const router = getRouter();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;
    const stakeStateRequest = RpcClient.request('getStakeState', [address]);
    const rewardStateRequest = RpcClient.request('getRewardState', [address]);
    const [stakeState, rewardState] = await Promise.all([
      stakeStateRequest,
      rewardStateRequest,
    ]);
    const { amount, stake_amount, delegate_amount, withdrawable_amount } =
      stakeState.data.result;
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

export default withErrorHandle(router);
