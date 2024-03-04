import React, { useContext, useState } from 'react';
import { defaultConfig, DynamicConfig } from './config';

interface DynamicConfigContext {
  config: DynamicConfig;
  setConfig: (newConfig: DynamicConfig) => void;
}

const configContextObject = React.createContext<DynamicConfigContext>({
  config: defaultConfig,
  setConfig: () => {
  }
});

export const useConfig = () => useContext(configContextObject);

const ConfigContextProvider = ({ children }: any) => {
  const [configState, setConfigState] = useState(defaultConfig);
  
  return (
      <configContextObject.Provider
          value={{
            config: configState,
            setConfig: setConfigState
          }}
      >
        {children}
      </configContextObject.Provider>
  );
};

export default ConfigContextProvider;
