
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
import MainAudioPage
  from 'app/pages/MainAudioPage';
import LightPage
  from 'app/pages/LightPage';
import StairsPage
  from 'app/pages/StairsPage';
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
          <Route index
            element={<MainHallPage />} />
          <Route path="/audio"
            element={<MainAudioPage />} />
          <Route path="/lights"
            element={<LightPage />} />
          <Route path="/treppe"
            element={<StairsPage />} />
          <Route path="*"
            element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </TasmotaProvider>
    </MqttProvider>
    </ConfigProvider>
  );
};

export default Main;
