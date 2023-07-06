import request from './request';

export enum StakeEvent {
  Add = 'add',
  Redeem = 'redeem',
  Withdraw = 'withdraw',
}

export enum OperateType {
  Stake = 'stake',
  Delegate = 'delegate',
}

export enum StakeStatus {
  Success = 'success',
  Pending = 'pending',
  Failed = 'failed',
}

export type Paginated<T> = {
  total: number;
  data: T[];
};

export interface StakeRate {
  rate: number;
  minimumAmount: number;
}

export interface StakeAmount {
  amount: number;
  stake_amount: number;
  delegate_amount: number;
  withdrawable_amount: number;
}

export interface RewardAmount {
  unlock_amount: number;
  locked_amount: number;
}

export interface StakeRecord {
  id: string;
  amount: string;
  event: StakeEvent;
  type: OperateType;
  status: StakeStatus;
  transcations: {
    hash: string;
    status: StakeStatus;
    timestamp: Date;
  }[];
}

export interface DelegateRecord {
  address: string;
  amount: string;
}

export interface RewardRecord {
  epoch: number;
  amount: number;
  locked: boolean;
  from: {
    type: 'stake' | 'delegate';
    address: string;
    amount: number;
  }[];
}

export interface WithdrawRecord {
  timestamp: Date;
  hash: string;
  amount: number;
  status: StakeStatus;
}

export interface EpochAmountRecord {
  epoch: number;
  amount: number;
}

export interface ChainState {
  epoch: number;
  period: number;
  block_number: number;
  total_stake_amount: number;
}

export interface TransactionRecord {
  timestamp: Date;
  hash: string;
  amount: number;
  status: StakeStatus;
}

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
