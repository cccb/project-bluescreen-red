/**
 * Config provider loads the application
 * runtime configuration.
 */

import { useState
       , createContext
       , useEffect
       , useContext
       } from 'react';


const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

/**
 * ConfigProvider
 */
const ConfigProvider = ({children}) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    // Get configuration from server
    fetch("/config/config.json").then(
      (data) => data.json().then(
        (config) => setConfig(config)));
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;
