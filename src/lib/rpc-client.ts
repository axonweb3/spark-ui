import axios from 'axios';
import * as Boom from '@hapi/boom';
import env from './env';
import logger from './logger';

const { NEXT_PUBLIC_SPARK_RPC_URL } = env;

axios.interceptors.request.use((request) => {
  const { method, params } = request.data;
  logger.info(`[RPC] ${method} ${JSON.stringify(params)}`);
  return request;
});

axios.interceptors.response.use((response) => {
  const { data, config } = response;
  const { method } = JSON.parse(config.data);
  if (response.data.error) {
    logger.error(`[RPC] ${method} ${JSON.stringify(data)}`);
    const boom = Boom.serverUnavailable(response.data.error.message);
    return Promise.reject(boom);
  } else {
    logger.debug(`[RPC] ${method} ${JSON.stringify(data)}`);
  }
  return response;
});

export function request(method: string, params: any[] = []) {
  return axios.post(NEXT_PUBLIC_SPARK_RPC_URL, {
    jsonrpc: '2.0',
    method,
    params,
  });
}
