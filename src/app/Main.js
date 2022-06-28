
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

import PageMainHall
  from 'app/pages/main-hall/Page';
import PageNotFound
  from 'app/pages/not-found/Page';

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
          <Route index    element={<PageMainHall />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Page>
    </BrowserRouter>
    </MqttProvider>
    </ConfigProvider>
  );
};

export default Main;
