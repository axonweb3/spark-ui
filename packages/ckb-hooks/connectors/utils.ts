import { CellDep } from '@ckb-lumos/lumos';
import { getConfig } from '../config';

export function getScriptCellDep(name: string): CellDep {
  const config = getConfig();
  const script = config.chain.SCRIPTS[name];
  return {
    outPoint: {
      txHash: script!.TX_HASH,
      index: script!.INDEX,
    },
    depType: script!.DEP_TYPE,
  };
}
