
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import mainHallReducer from 'pages/main-hall/reducer'
import mainAudioReducer from 'pages/main-audio/reducer'
import mainHdmiReducer from 'pages/main-hdmi/reducer'
import lightsReducer from 'pages/lights/reducer'
import soundboardReducer from 'pages/soundboard/reducer'
import configReducer from 'utils/config/reducer'

export default combineReducers({
  router: routerReducer,
  mainHall: mainHallReducer,
  mainAudio: mainAudioReducer,
  mainHdmi: mainHdmiReducer,
  lights: lightsReducer,
  soundboard: soundboardReducer,
  config: configReducer
});

