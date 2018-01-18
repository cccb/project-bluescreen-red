

import {SET_VALUE,
        MQTT_GET_LIGHT_VALUES_SUCCESS,
        MQTT_SET_LIGHT_VALUE_SUCCESS} from './actions'

// Lights Mapping
const lightsMapping = [
  "entry",
  "foh",
  "deskWall",
  "deskBar"
];

// Lights State
const initialState = {
  values: [50, 50, 50, 50]
};

/*
 * Set a value based on the handle
 */
function updateValue(state, light) {
  let next = Object.assign({}, state);
  next.values[light.id] = light.value;

  return next;
}

/*
 * Update a single light value
 */
function updateMqttLightValue(state, light) {
  let next = Object.assign({}, state);
  let percentage = 100.0 * light.value / 255.0;
  next.values[light.id] = percentage;

  return next;
}

/*
 * Update light values as retrieved from 
 * MQTT.
 */
function updateMqttLightValues(state, lights) {
  let next = Object.assign({}, state);
  for (let light of lights) {
    let percentage = 100.0 * light.value / 255.0;
    next.values[light.id] = percentage;
  }

  return next;
}


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_VALUE:
      return updateValue(state, action.payload);
    case MQTT_GET_LIGHT_VALUES_SUCCESS:
      return updateMqttLightValues(state, action.payload);
    case MQTT_SET_LIGHT_VALUE_SUCCESS:
      return updateMqttLightValue(state, action.payload);

  }

  return state;
}


