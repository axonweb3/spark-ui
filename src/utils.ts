import { BI } from "@ckb-lumos/bi";

export const getBalanceByCapacity = (capacity: BI): string => {
  return BI.from(capacity).toString();
};
