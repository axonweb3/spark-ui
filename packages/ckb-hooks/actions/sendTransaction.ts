import { BI, helpers } from '@ckb-lumos/lumos';
import { getConfig } from '../config';

const TX_FEE_CAPACITY = BI.from(100000);

export async function sendTransaction(to: string, amount: string) {
  const config = getConfig();
  const connector = config.connector;
  if (!connector) {
    throw new Error('Please connect wallet first');
  }
  const amountCapacity = BI.from(amount).mul(10 ** 8);

  let tx = helpers.TransactionSkeleton({});
  const toScript = helpers.parseAddress(to);

  const transferOutputCell = {
    cellOutput: {
      capacity: amountCapacity.toHexString(),
      lock: toScript,
    },
    data: '0x',
  };

  const minimalCapacity = helpers.minimalCellCapacity(transferOutputCell);
  if (amountCapacity.lt(minimalCapacity)) {
    throw new Error(`Amount must be larger than ${minimalCapacity}`);
  }

  tx = tx.update('outputs', (outputs) => outputs.push(transferOutputCell));

  const neededCapacity = amountCapacity.add(TX_FEE_CAPACITY);
  tx = await connector!.injectCapacity(tx, neededCapacity);

  const signedTx = await connector!.signTransaction(tx);
  const txHash = await config.rpcClient.sendTransaction(signedTx, 'passthrough');

  return txHash;
}
