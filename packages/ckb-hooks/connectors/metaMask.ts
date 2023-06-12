import { BI, Transaction, commons, helpers } from '@ckb-lumos/lumos';
import { Connector, ConnectorData } from './base';
import { Address, EIP1193Provider, Hex } from 'viem';
import { getConfig } from '../config';
import { bytes } from '@ckb-lumos/codec';
import { Cell, blockchain } from '@ckb-lumos/base';
import { getScriptCellDep } from './utils';

declare global {
  interface Window {
    ethereum: EIP1193Provider & {
      isMetaMask?: boolean;
      selectedAddress: Address;
    };
  }
}

const OMNILOCK_SIGNATURE_PLACEHOLDER = bytes.hexify(
  new Uint8Array(
    commons.omnilock.OmnilockWitnessLock.pack({
      signature: new Uint8Array(65).buffer,
    }).byteLength,
  ),
);

export class MetaMaskConnector extends Connector {
  public id = 'MetaMask';
  private data: ConnectorData<Hex[] | undefined> | undefined;

  private getProvider(): Window['ethereum'] | undefined {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const ethereum = window?.ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
      return undefined;
    }
    return ethereum;
  }

  public async connect(): Promise<ConnectorData<Hex[] | undefined>> {
    const provider = this.getProvider();
    const config = getConfig();
    const accounts = await provider?.request({ method: 'eth_requestAccounts' });
    const ethAddr = accounts![0];
    const omniLockScript = commons.omnilock.createOmnilockScript({ auth: { flag: 'ETHEREUM', content: ethAddr! } });
    const address = helpers.encodeToAddress(omniLockScript);

    const data = {
      address,
      chain: config.chain,
      data: accounts,
    };
    this.data = data;
    return data;
  }

  public async injectCapacity(
    tx: helpers.TransactionSkeletonType,
    neededCapacity: BI,
  ): Promise<helpers.TransactionSkeletonType> {
    const config = getConfig();
    const { address } = this.data!;
    const fromScript = helpers.parseAddress(address);

    let capacities = BI.from(0);
    const inputCells: Cell[] = [];
    const collector = config.indexer.collector({ lock: fromScript, type: 'empty' });
    for await (const cell of collector.collect()) {
      capacities = capacities.add(cell.cellOutput.capacity);
      inputCells.push(cell);
      if (BI.from(capacities).gte(neededCapacity)) break;
    }

    if (capacities.lt(neededCapacity)) {
      throw new Error('Not enough capacity');
    }

    const changeOutputCell = {
      cellOutput: {
        capacity: capacities.sub(neededCapacity).toHexString(),
        lock: fromScript,
      },
      data: '0x',
    };

    tx = tx.update('inputs', (inputs) => inputs.push(...inputCells));
    tx = tx.update('outputs', (outputs) => outputs.push(changeOutputCell));
    return tx;
  }

  public async signTransaction(tx: helpers.TransactionSkeletonType): Promise<Transaction> {
    const provider = this.getProvider();
    const inputs = tx.get('inputs');

    tx = tx.update('cellDeps', (cellDeps) =>
      cellDeps.push(getScriptCellDep('OMNILOCK'), getScriptCellDep('SECP256K1_BLAKE160')),
    );

    const witness = bytes.hexify(blockchain.WitnessArgs.pack({ lock: OMNILOCK_SIGNATURE_PLACEHOLDER }));
    inputs.forEach(() => {
      tx = tx.update('witnesses', (witnesses) => witnesses.push(witness));
    });

    tx = commons.omnilock.prepareSigningEntries(tx);
    const { message } = tx.signingEntries.get(0)!;
    let signature: string = await provider!.request({
      method: 'personal_sign',
      params: [message as Hex, provider!.selectedAddress],
    });

    // Fix ECDSA recoveryId v parameter
    // https://bitcoin.stackexchange.com/questions/38351/ecdsa-v-r-s-what-is-v
    let v = Number.parseInt(signature.slice(-2), 16);
    if (v >= 27) v -= 27;
    signature = '0x' + signature.slice(2, -2) + v.toString(16).padStart(2, '0');

    const signedWitness = bytes.hexify(
      blockchain.WitnessArgs.pack({
        lock: commons.omnilock.OmnilockWitnessLock.pack({
          signature: bytes.bytify(signature!).buffer,
        }),
      }),
    );

    tx = tx.update('witnesses', (witnesses) => witnesses.set(0, signedWitness));
    const signedTx = helpers.createTransactionFromSkeleton(tx);
    return signedTx;
  }
}
