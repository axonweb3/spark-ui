import { BI } from '@ckb-lumos/bi';
import format from 'date-fns/format';

export const getBalanceByCapacity = (capacity: BI): string => {
  return BI.from(capacity).toString();
};

export const renderTransactionHash = (hash: string): string => {
  return `${hash.slice(0, 10)}...${hash.slice(-10)}`;
};

export const renderAmount = (amount: string): string => {
  return `${parseInt(amount, 10)} AT`;
};

export const renderDateString = (date: string): string => {
  return format(new Date(date), 'yyyy/MM/dd HH:mm:ss');
};
