import { BI, helpers } from '@ckb-lumos/lumos';
import { getConfig } from '../config';

export async function getCapacities() {
  const config = getConfig();
  const activeConnector = config.connector;
  if (!activeConnector) {
    return BI.from(0);
  }

  if (activeConnector.getCapacities) {
    const capacities = await activeConnector.getCapacities();
    return capacities;
  }

  const data = config.getConnectData();
  if (!data) {
    return BI.from(0);
  }
  const collector = config.indexer.collector({
    lock: helpers.parseAddress(data?.address),
  });

  let capacities = BI.from(0);
  for await (const cell of collector.collect()) {
    capacities = capacities.add(cell.cellOutput.capacity);
  }
  return capacities;
}
