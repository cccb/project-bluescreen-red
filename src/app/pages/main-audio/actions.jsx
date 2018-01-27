

export const SET_MASTER_VOLUME =
             "@main-audio/SET_MASTER_VOLUME";

export const MQTT_GET_LEVELS_REQUEST =
             "@@mqtt/v1/mainhall/soundweb/GET_LEVELS_REQUEST";
export const MQTT_GET_LEVELS_SUCCESS =
             "@@mqtt/v1/mainhall/soundweb/GET_LEVELS_SUCCESS";

export const MQTT_GET_TOGGLES_REQUEST =
             "@@mqtt/v1/mainhall/soundweb/GET_TOGGLES_REQUEST";
export const MQTT_GET_TOGGLES_SUCCESS =
             "@@mqtt/v1/mainhall/soundweb/GET_TOGGLES_SUCCESS";

export const MQTT_GET_SOURCES_REQUEST =
             "@@mqtt/v1/mainhall/soundweb/GET_SOURCES_REQUEST";
export const MQTT_GET_SOURCES_SUCCESS =
             "@@mqtt/v1/mainhall/soundweb/GET_SOURCES_SUCCESS";

export const MQTT_SET_LEVEL_REQUEST = 
             "@@mqtt/v1/mainhall/soundweb/SET_LEVEL_REQUEST";
export const MQTT_SET_LEVEL_SUCCESS = 
             "@@mqtt/v1/mainhall/soundweb/SET_LEVEL_SUCCESS";

export const MQTT_SET_TOGGLE_REQUEST =
             "@@mqtt/v1/mainhall/soundweb/SET_TOGGLE_REQUEST";
export const MQTT_SET_TOGGLE_SUCCESS =
             "@@mqtt/v1/mainhall/soundweb/SET_TOGGLE_SUCCESS";

export const MQTT_SET_SOURCE_REQUEST =
             "@@mqtt/v1/mainhall/soundweb/SET_SOURCE_REQUEST";
export const MQTT_SET_SOURCE_SUCCESS =
             "@@mqtt/v1/mainhall/soundweb/SET_SOURCE_SUCCESS";




export function setMasterVolume(value) {
  return {
    type: SET_MASTER_VOLUME,
    payload: {
      value: value
    }
  }
}


export function mqttSetLevelRequest(levelId, value) {
  // Remap value from 0..100 to 0.255
  const mapped_value = Math.round(255 * (value / 100));

  return {
    type: MQTT_SET_LEVEL_REQUEST,
    payload: {
      id: levelId,
      value: mapped_value
    }
  }
}


export function mqttGetLevelsRequest() {
  return {
    type: MQTT_GET_LEVELS_REQUEST,
    payload: null
  }
}


export function mqttGetTogglesRequest() {
  return {
    type: MQTT_GET_TOGGLES_REQUEST,
    payload: null
  }
}

export function mqttGetSourcesRequest() {
  return {
    type: MQTT_GET_SOURCES_REQUEST,
    payload: null
  }
}

