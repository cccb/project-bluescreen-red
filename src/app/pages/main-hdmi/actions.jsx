

export const MQTT_GET_SELECTED_INPUT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_REQUEST";
export const MQTT_GET_SELECTED_INPUT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_SUCCESS";
export const MQTT_GET_SELECTED_INPUT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_SELECTED_INPUT_ERROR";

export const MQTT_SET_SELECTED_INPUT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_REQUEST";
export const MQTT_SET_SELECTED_INPUT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_SUCCESS";
export const MQTT_SET_SELECTED_INPUT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_SELECTED_INPUT_ERROR";

export const MQTT_GET_AUDIO_MODE_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUDIO_MODE_REQUEST";
export const MQTT_GET_AUDIO_MODE_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUDIO_MODE_SUCCESS";
export const MQTT_GET_AUDIO_MODE_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUDIO_MODE_ERROR";

export const MQTT_SET_AUDIO_MODE_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUDIO_MODE_REQUEST";
export const MQTT_SET_AUDIO_MODE_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUDIO_MODE_SUCCESS";
export const MQTT_SET_AUDIO_MODE_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUDIO_MODE_ERROR";

export const MQTT_GET_AUTO_SELECT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUTO_SELECT_REQUEST";
export const MQTT_GET_AUTO_SELECT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUTO_SELECT_SUCCESS";
export const MQTT_GET_AUTO_SELECT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_AUTO_SELECT_ERROR";

export const MQTT_SET_AUTO_SELECT_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUTO_SELECT_REQUEST";
export const MQTT_SET_AUTO_SELECT_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUTO_SELECT_SUCCESS";
export const MQTT_SET_AUTO_SELECT_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/SET_AUTO_SELECT_ERROR";

export const MQTT_GET_CONNECTION_STATES_REQUEST =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_REQUEST";
export const MQTT_GET_CONNECTION_STATES_SUCCESS =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_SUCCESS";
export const MQTT_GET_CONNECTION_STATES_ERROR =
  "@@mqtt/v1/mainhall/hdmimatrix/GET_CONNECTION_STATES_ERROR";


/*
 * Action Creators
 */

export function mqttGetSelectedInputRequest() {
  return {
    type: MQTT_GET_SELECTED_INPUT_REQUEST,
    payload: {},
  };
}

export function mqttSetSelectedInputRequest(inputId) {
  return {
    type: MQTT_SET_SELECTED_INPUT_REQUEST,
    payload: {
      input_id: inputId
    }
  };
}

export function mqttGetAudioModeRequest() {
  return {
    type: MQTT_GET_AUDIO_MODE_REQUEST,
    payload: {},
  };
}

export function mqttSetAudioModeRequest(modeId) {
  return {
    type: MQTT_SET_AUDIO_MODE_REQUEST,
    payload: {
      mode_id: modeId
    }
  };
}

export function mqttGetAutoSelectRequest() {
  return {
    type: MQTT_GET_AUTO_SELECT_REQUEST,
    payload: {}
  };
}

export function mqttSetAutoSelectRequest(enabled) {
  return {
    type: MQTT_SET_AUTO_SELECT_REQUEST,
    payload: {
      enabled: enabled
    }
  };
}

export function mqttGetConnectionStatesRequest() {
  return {
    type: MQTT_GET_CONNECTION_STATES_REQUEST,
    payload: {},
  };
}
