import type { NextApiRequest, NextApiResponse } from 'next';
import { addressMiddleware } from '@/middlewares/address';
import * as RpcClient from '@/lib/rpc-client';
import { withErrorHandle } from '@/lib/with-error';
import { getRouter } from '@/lib/router';

const router = getRouter();

router
  .use(addressMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, amount } = req.body;
    const { data } = await RpcClient.request('unstake', [address, amount]);
    res.json(data.result);
  });

export default withErrorHandle(router);
