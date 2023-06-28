import type { NextApiRequest, NextApiResponse } from 'next';
import { addressMiddleware } from '@/middlewares/address';
import * as RpcClient from '@/lib/rpc-client';
import { withErrorHandle } from '@/lib/with-error';
import { getRouter } from '@/lib/router';

const router = getRouter();

router
  .use(addressMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, event } = req.query;
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const { data } = await RpcClient.request('getStakeHistory', [
      address,
      pageNumber,
      pageSize,
      event,
      'stake',
    ]);
    res.json(data.result);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, amount } = req.body;
    const { data } = await RpcClient.request('stake', [address, amount]);
    res.json(data.result);
  });

export default withErrorHandle(router);
