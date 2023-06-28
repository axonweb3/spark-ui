import type { NextApiRequest, NextApiResponse } from 'next';
import * as RpcClient from '@/lib/rpc-client';
import { withErrorHandle } from '@/lib/with-error';
import { getRouter } from '@/lib/router';

const router = getRouter();

async function getStakeAmountByEpoch(
  type: 'stake' | 'delegate',
  pageNumber: number = 1,
  pageSize: number = 100,
) {
  const response = await RpcClient.request('getStakeAmountByEpoch', [
    type,
    pageNumber,
    pageSize,
  ]);
  const { data = [] } = response.data?.result ?? {};
  return data.map((item: any) => ({ ...item, type }));
}

async function getChainState() {
  const response = await RpcClient.request('getChainState');
  return response.data?.result ?? {};
}

async function getTopStakeAddresses(
  pageNumber: number = 1,
  pageSize: number = 10,
) {
  const response = await RpcClient.request('getTopStakeAddresses', [
    pageNumber,
    pageSize,
  ]);
  const { data = [] } = response.data?.result ?? {};
  return data;
}

async function getLatestStakeTransactions(
  pageNumber: number = 1,
  pageSize: number = 10,
) {
  const response = await RpcClient.request('getLatestStakeTransactions', [
    pageNumber,
    pageSize,
  ]);
  const { data = [] } = response.data?.result ?? {};
  return data;
}

router.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const [
    stakeAmount,
    delegateAmount,
    chainState,
    topStakeAddresses,
    latestStakeTransactions,
  ] = await Promise.all([
    getStakeAmountByEpoch('stake'),
    getStakeAmountByEpoch('delegate'),
    getChainState(),
    getTopStakeAddresses(),
    getLatestStakeTransactions(),
  ]);

  const stakeAmountByEpoch = [...stakeAmount, ...delegateAmount];
  res.json({
    stakeAmountByEpoch,
    chainState,
    topStakeAddresses,
    latestStakeTransactions,
  });
});

export default withErrorHandle(router);
