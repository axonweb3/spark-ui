import { BI, Script, Transaction, helpers } from '@ckb-lumos/lumos';
import { Chain } from '../chains';

export interface ConnectorData<T = unknown> {
  address: string;
  chain: Chain;
  data: T;
}

export interface Connector {
  getCapacities?(): Promise<BI>;
  getLockScript?(): Promise<Script>;
}

export type ConnectStatus = 'connected' | 'connecting' | 'disconnected';

export abstract class Connector {
  abstract id: string;
  abstract connect(): Promise<ConnectorData>;
  abstract injectCapacity(
    tx: helpers.TransactionSkeletonType,
    neededCapacity: BI,
  ): Promise<helpers.TransactionSkeletonType>;
  abstract signTransaction(tx: helpers.TransactionSkeletonType): Promise<Transaction>;

  public status: ConnectStatus = 'disconnected';

  public async doConnect(): Promise<ConnectorData> {
    this.status = 'connecting';
    return this.connect()
      .then((data) => {
        this.status = 'connected';
        return data;
      })
      .catch((err) => {
        this.status = 'disconnected';
        throw err;
      });
  }

  public async doDisconnect(): Promise<void> {
    this.status = 'disconnected';
    return;
  }
}
