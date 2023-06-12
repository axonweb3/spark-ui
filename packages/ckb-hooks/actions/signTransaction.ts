import { helpers } from '@ckb-lumos/lumos';
import { getConfig } from '../config';

export async function signTransaction(tx: helpers.TransactionSkeletonType) {
  const config = getConfig();
  const connector = config.connector;
  if (!connector) {
    throw new Error('Please connect wallet first');
  }
  const signedTx = await connector!.signTransaction(tx);
  return signedTx;
}
