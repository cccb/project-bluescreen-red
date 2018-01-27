
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import mainHallReducer from 'pages/main-hall/reducer'
import mainAudioReducer from 'pages/main-audio/reducer'
import lightsReducer from 'pages/lights/reducer'
import configReducer from 'utils/config/reducer'

export default combineReducers({
  router: routerReducer,
  mainHall: mainHallReducer,
  mainAudio: mainAudioReducer,
  lights: lightsReducer,
  config: configReducer
});

