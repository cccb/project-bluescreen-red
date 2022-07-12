
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
import TasmotaProvider
  from 'app/components/tasmota/Provider';

import Layout 
  from 'app/components/page/Layout';

import MainHallPage 
  from 'app/pages/MainHallPage';
import NotFoundPage 
  from 'app/pages/NotFoundPage';

/**
 * Application Main Component
 */
const Main = () => {
  return (
    <ConfigProvider>
    <MqttProvider>
    <TasmotaProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index    element={<MainHallPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </TasmotaProvider>
    </MqttProvider>
    </ConfigProvider>
  );
};

export default Main;
