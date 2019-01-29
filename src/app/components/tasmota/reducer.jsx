
/*
 * Tasmota Reducer
 */

import {
  TASMOTA_TELEMETRY_UPDATE,
  TASMOTA_STATUS_UPDATE,
} from './actions'

import {
  UPDATE_CONFIG
} from 'utils/config/actions'

const initialState = {
  "devices": {},
}

const defaultDevice = {
  "state": {},
  "type": null,
};

function handleConfigUpdate(state, config) {
  const tasmota = config.tasmota;
  if (!tasmota || !tasmota.devices) {
    return state; // nothing to do here.
  }

  // Create devices
  const devices = {};
  for (const device of tasmota.devices) {
    devices[device.id] = Object.assign({}, defaultDevice, device);
  }

  const nextState = Object.assign({}, state, {
    devices: devices
  });

  return nextState;
}

function handleUpdate(state, payload) {
  const device = payload.device;
  let nextState = Object.assign({}, state);

  const nextDevice = Object.assign({},
    (state.devices[device]||defaultDevice));

  const nextDeviceState = Object.assign({}, nextDevice.state, {
    [payload.key]: payload.value
  });
  nextDevice.state = nextDeviceState;

  nextState.devices[device] = nextDevice;

  return nextState;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case TASMOTA_TELEMETRY_UPDATE:
      return handleUpdate(state, action.payload);
    case TASMOTA_STATUS_UPDATE:
      return handleUpdate(state, action.payload);

    case UPDATE_CONFIG:
      return handleConfigUpdate(state, action.payload);

    default:
  }

  return state;
}


