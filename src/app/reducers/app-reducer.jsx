
import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Pages / Components
import lightsReducer from 'pages/lights/reducer'


export default combineReducers({
  router: routerReducer,
  lights: lightsReducer
});

