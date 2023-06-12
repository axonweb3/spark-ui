import { getConfig } from '../config';

export function disconnect() {
  const config = getConfig();
  config.disconnect();
}
