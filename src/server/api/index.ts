import request from './request';
import {
  ChainState,
  DelegateRecord,
  EpochAmountRecord,
  OperateType,
  Paginated,
  RewardAmount,
  RewardRecord,
  StakeAmount,
  StakeEvent,
  StakeRate,
  StakeRecord,
  TransactionRecord,
  WithdrawRecord,
} from './type';

export async function getStakeRate(address: string): Promise<StakeRate> {
  const { data } = await request('getStakeRate', [address]);
  return data.result as StakeRate;
}

export async function getStakeState(address: string): Promise<StakeAmount> {
  const { data } = await request('getStakeState', [address]);
  return data.result as StakeAmount;
}

export async function getRewardState(address: string): Promise<RewardAmount> {
  const { data } = await request('getRewardState', [address]);
  return data.result as RewardAmount;
}

export async function getStakeHistory(
  address: string,
  pageNumber: number,
  pageSize: number,
  event?: StakeEvent,
  type?: OperateType,
): Promise<Paginated<StakeRecord>> {
  const { data } = await request('getStakeHistory', [
    address,
    pageNumber,
    pageSize,
    event,
    type,
  ]);
  return data.result;
}

export async function getDelegatedRecords(
  address: string,
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<DelegateRecord>> {
  const { data } = await request('getDelegatedRecords', [
    address,
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function getRewardHistory(
  address: string,
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<RewardRecord>> {
  const { data } = await request('getRewardHistory', [
    address,
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function getWithdrawalHistory(
  address: string,
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<WithdrawRecord>> {
  const { data } = await request('getWithdrawalHistory', [
    address,
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function getStakeAmountByEpoch(
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<EpochAmountRecord>> {
  const { data } = await request('getStakeAmountByEpoch', [
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function getChainState(): Promise<ChainState> {
  const { data } = await request('getChainState');
  return data.result;
}

export async function getTopStakeAddresses(
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<{ address: string; amount: number }>> {
  const { data } = await request('getTopStakeAddresses', [
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function getLatestStakeTransactions(
  pageNumber: number,
  pageSize: number,
): Promise<Paginated<TransactionRecord>> {
  const { data } = await request('getLatestStakeTransactions', [
    pageNumber,
    pageSize,
  ]);
  return data.result;
}

export async function stake(address: string, amount: number) {
  const { data } = await request('stake', [address, amount]);
  return data.result;
}

export async function unstake(address: string, amount: number) {
  const { data } = await request('unstake', [address, amount]);
  return data.result;
}

export async function delegate(address: string, delegateTo: string, amount: number) {
  const { data } = await request('delegate', [address, delegateTo, amount]);
  return data.result;
}

export async function withdrawStake(address: string, type: 'stake' | 'delegate') {
  const { data } = await request('withdrawStake', [address, type]);
  return data.result;
}

export async function withdrawReward(address: string) {
  const { data } = await request('withdrawReward', [address]);
  return data.result;
}

