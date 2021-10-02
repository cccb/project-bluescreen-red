
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import mainHallReducer from 'pages/main-hall/reducer'
import mainAudioReducer from 'pages/main-audio/reducer'
import mainHdmiReducer from 'pages/main-hdmi/reducer'
import lightsReducer  from 'pages/lights/reducer'
import soundboardReducer from 'pages/soundboard/reducer'
import stairsReducer  from 'pages/stairs/reducer'
import configReducer  from 'utils/config/reducer'
import statReducer    from 'components/power-stats/reducer'
import tasmotaReducer from 'components/tasmota/reducer'

export default combineReducers({
  router: routerReducer,
  mainHall: mainHallReducer,
  mainAudio: mainAudioReducer,
  mainHdmi: mainHdmiReducer,
  lights: lightsReducer,
  soundboard: soundboardReducer,
  stairs: stairsReducer,
  config: configReducer,
  tasmota: tasmotaReducer,
  stat: statReducer,
});

