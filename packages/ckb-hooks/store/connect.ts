import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';
import type { ConnectorData, Connector } from '../connectors/base';

export const connectAtom = atomFamily((id) => atomWithStorage<ConnectorData | undefined>(`connect@${id}`, undefined));

export const connectorAtom = atom<Connector | undefined>(undefined);
