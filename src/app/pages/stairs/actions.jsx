
export const MQTT_TREPPE_POWER_STATE_CHANGED =
  "@@mqtt/v1/treppe/power/POWER_STATE_CHANGED";

export const MQTT_TREPPE_POWER_STATE =
  "@@mqtt/v1/treppe/power/POWER_STATE";

export const MQTT_TREPPE_POWER_ON =
  "@@mqtt/v1/treppe/power/POWER_ON";

export const MQTT_TREPPE_POWER_OFF =
  "@@mqtt/v1/treppe/power/POWER_OFF";


export function powerState() {
  return {
    type: MQTT_TREPPE_POWER_STATE,
    payload: {},
  }
}

export function powerOn() {
  return {
    type: MQTT_TREPPE_POWER_ON,
    payload: {},
  }
}

export function powerOff() {
  return {
    type: MQTT_TREPPE_POWER_OFF,
    payload: {},
  }
}
