
export const SET_VALUE = "@lights/SET_VALUE";

export const MQTT_GET_LIGHT_VALUES_REQUEST = "@@mqtt/dali/GET_LIGHT_VALUES_REQUEST";
export const MQTT_GET_LIGHT_VALUES_SUCCESS = "@@mqtt/dali/GET_LIGHT_VALUES_SUCCESS";
export const MQTT_GET_LIGHT_VALUES_ERROR = "@@mqtt/dali/GET_LIGHT_VALUES_ERROR";

export const MQTT_SET_LIGHT_VALUE_REQUEST = "@@mqtt/dali/SET_LIGHT_VALUE_REQUEST";
export const MQTT_SET_LIGHT_VALUE_SUCCESS = "@@mqtt/dali/SET_LIGHT_VALUE_SUCCESS";

// Action creators
export function setValue(id, value) {
  return {
    type: SET_VALUE,
    payload: {
      id: id,
      value: value
    }
  }
}


export function mqttGetLightValuesRequest() {
  return {
    type: MQTT_GET_LIGHT_VALUES_REQUEST,
    payload: {
    }
  }
}

export function mqttSetLightValueRequest(id, percentage) {
  let value = Math.round((percentage / 100.0) * 255.0)
  return {
    type: MQTT_SET_LIGHT_VALUE_REQUEST,
    payload: {
      id: id,
      value: value
    }
  }
}

