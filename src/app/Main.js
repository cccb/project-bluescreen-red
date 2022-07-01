
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

import Page
  from 'app/components/page/Page';

import MainHallPage 
  from 'app/pages/main-hall/MainHallPage';
import NotFoundPage 
  from 'app/pages/not-found/NotFoundPage';

/**
 * Application Main Component
 */
const Main = () => {
  return (
    <ConfigProvider>
    <MqttProvider>
    <BrowserRouter>
      <Page>
        <Routes>
          <Route index    element={<MainHallPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Page>
    </BrowserRouter>
    </MqttProvider>
    </ConfigProvider>
  );
};

export default Main;
