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
    const { data } = await RpcClient.request('getStakeRate', [address]);
    res.json(data.result);
  });

export default withErrorHandle(router);
