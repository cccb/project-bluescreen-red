
/**
 * Project Bluescreen Red
 * 
 * @author Annika <annika@berlin.ccc.de>
 */

import { BrowserRouter
       , Routes
       , Route
       }
  from 'react-router-dom';



import ConfigProvider
  from 'app/components/config/Provider';
import MqttProvider
  from 'app/components/mqtt/Provider';

import PageMainHall
  from 'app/pages/main-hall/Page';

/**
 * Application Main Component
 */
const Main = () => {
  return (
    <ConfigProvider>
    <MqttProvider>
      <PageMainHall />
    </MqttProvider>
    </ConfigProvider>
  );
};

export default Main;
