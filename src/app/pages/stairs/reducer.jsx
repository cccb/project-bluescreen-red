
import {MQTT_TREPPE_POWER_STATE_CHANGED}
 from './actions'


const initialState = {
  power: 0,
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case MQTT_TREPPE_POWER_STATE_CHANGED:
      return Object.assign({}, state, {
        power: !!action.payload.state,
      });
  }

  return state;
}

