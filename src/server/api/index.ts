import { request } from './rpc-client';
import {
  AddressAmount,
  ChainState,
  DelegateDeltas,
  OperationType,
  Pagination,
  PaginationResult,
  RewardState,
  StakeAmount,
  StakeRate,
  StakeState,
  TransactionEvent,
  TransactionHistory,
} from './type';

export async function getStakeRate(address: string): Promise<StakeRate> {
  const data = await request('getStakeRate', [address]);
  return data as StakeRate;
}

export async function getStakeState(address: string): Promise<StakeState> {
  const data = await request('getStakeState', [address]);
  return data;
}

export async function getRewardState(address: string): Promise<RewardState> {
  const data = await request('getRewardState', [address]);
  return data;
}

export async function getStakeHistory(
  address: string,
  event: TransactionEvent | null,
  pagination: Pagination,
): Promise<PaginationResult<TransactionHistory>> {
  const data = await request('getStakeHistory', [address, event, pagination]);
  return data;
}

export async function getDelegateHistory(
  address: string,
  event: TransactionEvent | null,
  pagination: Pagination,
): Promise<PaginationResult<TransactionHistory>> {
  const data = await request('getDelegateHistory', [address, event, pagination]);
  return data;
}

export async function getDelegateRecords(address: string): Promise<DelegateDeltas> {
  const data = await request('getDelegateRecords', [address]);
  return data;
}

export async function getRewardHistory(
  address: string,
  event: TransactionEvent | null,
  pagination: Pagination,
): Promise<PaginationResult<TransactionHistory>> {
  const data = await request('getRewardHistory', [address, event, pagination]);
  return data;
}

export async function getChainState(): Promise<ChainState> {
  const data = await request('getChainState');
  return data;
}

export async function getStakeAmountByEpoch(
  start: number,
  end: number,
  operation: OperationType,
): Promise<StakeAmount[]> {
  const data = await request('getStakeAmountByEpoch', [start, end, operation]);
  return data;
}

export async function getTopStakeAddress(limit: number): Promise<AddressAmount[]> {
  const data = await request('getTopStakeAddress', [limit]);
  return data;
}

export async function getLatestStakeTransactions(
  pagination: Pagination,
): Promise<PaginationResult<TransactionHistory>> {
  const data = await request('getLatestStakeTransactions', [pagination]);
  return data;
}

export async function stake(address: string, amount: number) {
  const data = await request('stake', [address, amount]);
  return data;
}

export async function unstake(address: string, amount: number) {
  const data = await request('unstake', [address, amount]);
  return data;
}

export async function delegate(address: string, delegateTo: string, amount: number) {
  const data = await request('delegate', [address, delegateTo, amount]);
  return data;
}

export async function withdrawStake(address: string, type: 'stake' | 'delegate') {
  const { data } = await request('withdrawStake', [address, type]);
  return data.result;
}

export async function withdrawReward(address: string) {
  const data = await request('withdrawReward', [address]);
  return data;
}
