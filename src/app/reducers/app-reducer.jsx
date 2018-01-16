
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import lightsReducer from 'pages/lights/reducer'
import configReducer from 'utils/config/reducer'

export default combineReducers({
  router: routerReducer,
  lights: lightsReducer,
  config: configReducer
});

