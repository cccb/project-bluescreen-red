
/*
 * Main Hall HDMI matrix reducer
 */

import {MQTT_GET_SELECTED_INPUT_SUCCESS,
        MQTT_GET_SELECTED_INPUT_ERROR,

        MQTT_SET_SELECTED_INPUT_SUCCESS,
        MQTT_SET_SELECTED_INPUT_ERROR,

        MQTT_GET_AUDIO_MODE_SUCCESS,
        MQTT_GET_AUDIO_MODE_ERROR,

        MQTT_SET_AUDIO_MODE_SUCCESS,
        MQTT_SET_AUDIO_MODE_ERROR,

        MQTT_GET_AUTO_SELECT_SUCCESS,
        MQTT_GET_AUTO_SELECT_ERROR,

        MQTT_SET_AUTO_SELECT_SUCCESS,
        MQTT_SET_AUTO_SELECT_ERROR,

        MQTT_GET_CONNECTION_STATES_SUCCESS,
        MQTT_GET_CONNECTION_STATES_ERROR} from './actions'

const initialState = {
  connections: [false, false, false, false, false],
  audioMode: -1,
  audioModeInfo: "unknown",
  autoSelect: false,
  selectedInput: -1,
};


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case MQTT_GET_SELECTED_INPUT_SUCCESS:
    case MQTT_SET_SELECTED_INPUT_SUCCESS:
      return Object.assign({}, state, {
        selectedInput: action.payload.input_id
      });

    case MQTT_GET_AUDIO_MODE_SUCCESS:
    case MQTT_SET_AUDIO_MODE_SUCCESS:
      return Object.assign({}, state, {
        audioMode: action.payload.mode_id,
        audioModeInfo: action.payload.mode
      });

    case MQTT_GET_AUTO_SELECT_SUCCESS:
    case MQTT_SET_AUTO_SELECT_SUCCESS:
      return Object.assign({}, state, {
        autoSelect: action.payload.enabled
      });

    case MQTT_GET_CONNECTION_STATES_SUCCESS:
      return Object.assign({}, state, {
        connections: action.payload.connections
      });
  }

  return state;
}

