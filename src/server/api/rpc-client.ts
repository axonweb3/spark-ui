import { Client, HTTPTransport, RequestManager } from '@open-rpc/client-js';
import logger from '../logger';
import env from '../env';

const { NEXT_PUBLIC_SPARK_RPC_URL } = env;

const transport = new HTTPTransport(NEXT_PUBLIC_SPARK_RPC_URL);
const client = new Client(new RequestManager([transport]));

export async function request(method: string, params: any[] = []) {
  logger.info(`[RPC] ${method} ${JSON.stringify(params)}`);
  const response = await client.request({ method, params });
  logger.debug(`[RPC] ${method} ${JSON.stringify(response)}`);
  return response;
}
