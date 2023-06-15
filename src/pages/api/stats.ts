import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Boom from '@hapi/boom';
import axios from '@/lib/axios';

const router = createRouter<NextApiRequest, NextApiResponse>();

async function getStakeAmountByEpoch(
  type: 'stake' | 'delegate',
  pageNumber: number = 1,
  pageSize: number = 100,
) {
  const response = await axios.post(process.env.SPARK_RPC_URL!, {
    method: 'getStakeAmountByEpoch',
    params: [type, pageNumber, pageSize],
  });
  const { data = [] } = response.data?.result ?? {};
  return data.map((item: any) => ({ ...item, type }));
}

async function getChainState() {
  const response = await axios.post(process.env.SPARK_RPC_URL!, {
    method: 'getChainState',
  });

  return response.data?.result ?? {};
}

async function getTopStakeAddresses(pageNumber: number = 1, pageSize: number = 10) {
  const response = await axios.post(process.env.SPARK_RPC_URL!, {
    method: 'getTopStakeAddresses',
    params: [pageNumber, pageSize],
  });
  const { data = [] } = response.data?.result ?? {};
  return data;
}

router.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const [stakeAmount, delegateAmount, chainState, topStakeAddresses] =
    await Promise.all([
      getStakeAmountByEpoch('stake'),
      getStakeAmountByEpoch('delegate'),
      getChainState(),
      getTopStakeAddresses(),
    ]);

  const stakeAmountByEpoch = [...stakeAmount, ...delegateAmount];
  res.json({
    stakeAmountByEpoch,
    chainState,
    topStakeAddresses,
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
