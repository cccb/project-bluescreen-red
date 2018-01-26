

export const SET_MASTER_VOLUME = "@mainhall/SET_MASTER_VOLUME";

export const MQTT_SET_LEVEL_REQUEST = "@@mqtt/soundweb/SET_LEVEL_REQUEST";
export const MQTT_SET_LEVEL_SUCCESS = "@@mqtt/soundweb/SET_LEVEL_SUCCESS";


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



