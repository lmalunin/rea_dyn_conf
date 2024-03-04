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
    log.debug('App.tsx, fetching global config from', dynamicConfigUrl);
    axios
        .get(dynamicConfigUrl)
        .then((response) => {
          setConfig(response.data);
          log.debug('Global config fetched: ', response.data);
          setConfigLoadingState('ready');
        })
        .catch((e) => {
          // In Codesandbox.io: deleting `config.json` will not trigger this branch, because the request response code will still be 200, not 404.
          // To test this case in codesanbox.io, add "throw {};" to line 22.
          
          // In development, treat this case as a warning, render the app and use default config values.
          // In production (and test) on the other hand, show error instead of rendering the app.
          
          // In Codesandbox.io: You cannot change the value of NODE_ENV. To test this if, change "development"
          if (process.env.NODE_ENV === 'development') {
            log.warn(
                `Failed to load global configuration from '${dynamicConfigUrl}', using the default configuration instead:`,
                defaultConfig
            );
            setConfigLoadingState('ready');
          } else {
            log.error(
                configLoadingErrorMessage,
                `Have you provided the config file '${dynamicConfigUrl}'?`,
                e
            );
            setConfigLoadingState('error');
          }
        });
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
