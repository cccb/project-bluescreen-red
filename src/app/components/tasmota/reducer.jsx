
/*
 * Tasmota Reducer
 */

import {
  TASMOTA_TELEMETRY_UPDATE,
  TASMOTA_STATUS_UPDATE,
} from './actions'

const initialState = {
  "devices": {},
}

function handleUpdate(state, payload) {
  const device = payload.device;
  let nextState = Object.assign({}, state);

  nextState.devices[device] = Object.assign({}, (state.devices[device]||{}), {
    [payload.key]: payload.value
  });

  return nextState;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case TASMOTA_TELEMETRY_UPDATE:
      return handleUpdate(state, action.payload);
    case TASMOTA_STATUS_UPDATE:
      return handleUpdate(state, action.payload);

    default:
  }

  return state;
}


