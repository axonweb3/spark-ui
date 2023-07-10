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
