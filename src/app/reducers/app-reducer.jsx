
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import mainHallReducer from 'pages/main-hall/reducer'
import lightsReducer from 'pages/lights/reducer'
import configReducer from 'utils/config/reducer'

export default combineReducers({
  router: routerReducer,
  mainHall: mainHallReducer,
  lights: lightsReducer,
  config: configReducer
});

