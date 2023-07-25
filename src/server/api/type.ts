export enum HistoryEvent {
  Add = 0,
  Redeem = 1,
  Withdraw = 2,
}

export enum OperationType {
  Stake = 0,
  Delegate = 1,
  Reward = 2,
}

export type Pagination = {
  page: number;
  limit: number;
};

export type PaginationResult<T> = {
  total: number;
  data: T[];
};

export interface StakeRate {
  stake_rate: number;
  delegate_rate: number;
  minimum_amount: number;
}

export interface StakeState {
  total_amount: number;
  stake_amount: number;
  delegate_amount: number;
  withdrawable_amount: number;
}

export interface RewardState {
  unlock_amount: number;
  locked_amount: number;
}

export interface StakeAmount {
  epoch: number;
  amount: number;
}

export interface ChainState {
  epoch: number;
  period: number;
  block_number: number;
  total_stake_amount: number;
}

export interface AddressAmount {
  address: string;
  amount: number;
}

export interface TransactionHistory {
  id: number;
  address: string;
  timestamp: number;
  operation: number;
  event: number;
  tx_hash: string;
  tx_block: number;
  amount: number;
  epoch: number;
  status: number;
}

export interface DelegateDeltas {
  inner: {
    amount: number;
    staker: string;
  }[];
}
