import React, { useEffect, useState } from 'react';
import axios from 'axios';
import log from 'loglevel';
import logo from './logo.svg';
import './App.css';
import { useConfig } from './configuration/useConfig';
import { defaultConfig, dynamicConfigUrl } from './configuration/config';

const configLoadingErrorMessage =
    'Error while fetching global config, the App wil not be rendered. (This is NOT a React error.)';

function App() {
  
  const { config, setConfig } = useConfig();
  
  const [configLoadingState, setConfigLoadingState] = useState<
      'loading' | 'ready' | 'error'
  >('loading');
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setConfig(defaultConfig);
      setConfigLoadingState('ready');
    } else {
      axios
          .get(dynamicConfigUrl)
          .then((response) => {
            setConfig(response.data);
            log.debug('Global config fetched: ', response.data);
            setConfigLoadingState('ready');
          })
          .catch((e) => {
            console.log(
                configLoadingErrorMessage,
                `Have you provided the config file '${dynamicConfigUrl}'?`,
                e
            );
            setConfigLoadingState('error');
            
          });
    }
  }, [setConfig]);
  
  return (
      <div className="App">
        {config.apiUrl}
        <br/>
        {config.environment}
      </div>
  );
}

export default App;
