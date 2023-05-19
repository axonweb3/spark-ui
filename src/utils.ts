import { BI } from "@ckb-lumos/lumos";

export const getBalanceByCapacity = (capacity: BI): string => {
  return BI.from(capacity).toString();
};
