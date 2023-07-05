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
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const { data } = await RpcClient.request('getDelegatedRecords', [
      address,
      pageNumber,
      pageSize,
    ]);
    res.json(data.result);
  })

export default withErrorHandle(router);
