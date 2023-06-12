import { config } from '@ckb-lumos/lumos';

export interface RpcUrl {
  rpc: string;
  indexer: string;
}

export type Chain = config.Config & {
  name: string;
  network: string;
  urls: {
    public: RpcUrl;
  };
};

export const mainnet: Chain = {
  ...config.predefined.LINA,
  name: 'mirana',
  network: 'ckb',
  urls: {
    public: {
      rpc: 'https://mainnet.ckbapp.dev/rpc',
      indexer: 'https://mainnet.ckbapp.dev/indexer',
    },
  },
};

export const testnet: Chain = {
  ...config.predefined.AGGRON4,
  name: 'pudge',
  network: 'ckb_testnet',
  urls: {
    public: {
      rpc: 'https://testnet.ckbapp.dev/rpc',
      indexer: 'https://testnet.ckbapp.dev/indexer',
    },
  },
};
