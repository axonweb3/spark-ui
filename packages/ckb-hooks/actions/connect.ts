import { getConfig } from '../config';
import type { Connector } from '../connectors/base';
import { connectAtom } from '../store/connect';

export interface ConnectArgs {
  connector: Connector;
}

export async function connect({ connector }: ConnectArgs) {
  const config = getConfig();
  if (connector.status === 'connected') {
    return {
      connector,
      data: config.store.get(connectAtom(connector.id)),
    };
  }
  const data = await connector.doConnect();
  config.store.set(connectAtom(connector.id), data);

  return {
    connector,
    data,
  };
}
