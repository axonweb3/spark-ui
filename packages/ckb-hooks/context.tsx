import { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { Config, CreateConfigParameters } from './config';


export const SpinalConfigContext = createContext<Config | undefined>(undefined);

export interface SpinalConfigProviderProps extends PropsWithChildren {
  config: CreateConfigParameters;
}

export function SpinalConfigProvider(props: SpinalConfigProviderProps) {
  const { children, config } = props;
  const spinalConfig = Config.create(config);
  const store = createStore();

  return (
    <JotaiProvider store={store}>
      <SpinalConfigContext.Provider value={spinalConfig}>{children}</SpinalConfigContext.Provider>
    </JotaiProvider>
  );
}

export function useConfig() {
  const config = useContext(SpinalConfigContext);
  return config;
}
